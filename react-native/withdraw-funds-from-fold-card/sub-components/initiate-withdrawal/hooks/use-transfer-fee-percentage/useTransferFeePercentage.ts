import { useGetAstraConfigQuery } from 'src/api/ach/achEndpoints'
import { useAppSelector } from 'src/redux/hooks'
import { selectInstantDebitWithdrawalTransferFee } from 'src/api/ach/achSelectors'

export const useTransferFeePercentage = () => {
  const { isLoading: transferFeePercentageIsLoading } = useGetAstraConfigQuery()

  const transferFeePercentage = useAppSelector(
    selectInstantDebitWithdrawalTransferFee
  )

  return {
    transferFeePercentageIsLoading,
    transferFeePercentage: transferFeePercentage
      ? `${transferFeePercentage}%`
      : ''
  }
}
