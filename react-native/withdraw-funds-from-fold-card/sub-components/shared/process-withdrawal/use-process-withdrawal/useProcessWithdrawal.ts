import { useCallback, useEffect } from 'react'
import { useAppSelector } from 'src/redux/hooks'
import { useNavigation } from 'src/shared/hooks/use-navigation/useNavigation'
import { useMakeInstantDebitWithdrawalMutation } from 'src/api/ach/achEndpoints'
import {
  selectDestinationCard,
  selectWithdrawalAmount
} from 'src/screens/withdraw-funds-from-fold-card/redux/withdrawFundsFromFoldCardSelectors'
import { select2FAToken } from 'src/redux/global-slices/twoFactorAuthentication/twoFactorAuthenticationSelectors'

export const useProcessWithdrawal = () => {
  const token = useAppSelector(select2FAToken)

  const amount = String(useAppSelector(selectWithdrawalAmount))

  const [makeInstantWithdrawal, { error, isLoading, data }] =
    useMakeInstantDebitWithdrawalMutation()

  const { id: destination_id } = useAppSelector(selectDestinationCard) || {}

  const { navigateToWithdrawalSuccess } = useNavigation('WithdrawalSuccess')

  const processWithdrawal = useCallback(async () => {
    await makeInstantWithdrawal({
      token,
      amount,
      destination_id
    })
  }, [amount, token, destination_id])

  useEffect(() => {
    if (data) navigateToWithdrawalSuccess()
  }, [data])

  return {
    processWithdrawal,
    isWithdrawalProcessed: data,
    isProcessingWithdrawal: isLoading,
    processingWithdrawalError: error?.data || error?.error
  }
}
