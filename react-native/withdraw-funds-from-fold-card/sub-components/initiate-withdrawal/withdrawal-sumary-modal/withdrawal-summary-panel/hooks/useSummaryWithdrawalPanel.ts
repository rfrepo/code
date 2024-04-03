import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { useGetEstimatedTransferFeeQuery } from 'src/api/ach/achEndpoints'
import { useNavigation } from 'src/shared/hooks/use-navigation/useNavigation'
import { set2FAConfiguration } from 'src/redux/global-slices/two-factor-authentication/twoFactorAuthenticationV2Slice'
import { updateWithdrawalAmount } from 'src/screens/withdraw-funds-from-fold-card/redux/withdrawFundsFromFoldCardSlice'
import { selectDestinationCard } from 'src/screens/withdraw-funds-from-fold-card/redux/withdrawFundsFromFoldCardSelectors'

type Props = {
  onClose: () => void
  withdrawalAmount: string
  isWithdrawalProcessed: boolean
}

export const useSummaryWithdrawalPanel = ({
  onClose,
  withdrawalAmount,
  isWithdrawalProcessed
}: Props) => {
  const dispatch = useAppDispatch()

  const { navigateToTwoFactorAuthentication } = useNavigation(
    'TwoFactorAuthentication'
  )

  const amountAsNumber = Number(withdrawalAmount.replace(/[^0-9.]/g, ''))

  const { data: transferFeeData = {}, isLoading } =
    useGetEstimatedTransferFeeQuery(amountAsNumber)

  const { last_four_digits, card_company } = useAppSelector(
    selectDestinationCard
  )

  const destinationCardDetails = `${card_company} ending in ${last_four_digits}`

  const setup2FACloseModalThenNavigateTo2FA = () => {
    dispatch(updateWithdrawalAmount(amountAsNumber))

    dispatch(
      set2FAConfiguration({
        buttonType: 'themed',
        buttonTitle: 'Verify',
        post2FAScreen: 'ProcessWithdrawal',
        scope: '/v1/my/fold_card/instant_debit_withdrawal'
      })
    )

    onClose()

    navigateToTwoFactorAuthentication()
  }

  useEffect(() => {
    dispatch(updateWithdrawalAmount(amountAsNumber))
  }, [amountAsNumber])

  useEffect(() => {
    isWithdrawalProcessed && onClose()
  }, [isWithdrawalProcessed])

  return {
    transferFeeData,
    destinationCardDetails,
    isLoadingTransferFee: isLoading,
    setup2FACloseModalThenNavigateTo2FA
  }
}
