import tw from 'lib/tailwind'
import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemeButton } from 'src/theme/theme-button'
import Text from 'src/components-lib/components/text/Text'
import { convertStringToUSD } from 'src/shared/helpers/fiat/convert-string-to-usd/convertStringToUSD'
import { LoadingIndicatorOverlay } from 'src/shared/components/loading-indicator/loading-indicator-overlay/LoadingIndicatorOverlay'
import { ListItemContainer } from 'src/shared/components/list-item-container/ListItemContainer'
import { ErrorModal } from 'src/shared/components/error-modal/ErrorModal'
import { styles } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/withdrawal-sumary-modal/withdrawal-summary-panel/styles'
import { useProcessWithdrawal } from 'src/screens/withdraw-funds-from-fold-card/sub-components/shared/process-withdrawal/use-process-withdrawal/useProcessWithdrawal'
import { LabelAndValue } from 'src/shared/components/label-and-value/LabelAndValue'
import { useSummaryWithdrawalPanel } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/withdrawal-sumary-modal/withdrawal-summary-panel/hooks/useSummaryWithdrawalPanel'
import { useTransferFeePercentage } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/hooks/use-transfer-fee-percentage/useTransferFeePercentage'

type Props = {
  onClose: () => void
  withdrawalAmount: string
}

const {
  $loader,
  $button,
  $container,
  $totalLabel,
  $totalValue,
  $rowContainer,
  $listContainer,
  $totalContainer
} = styles

const activityIndicatorProps = {
  color: tw.color('black')
}

export const WithdrawalSummaryPanel = ({
  onClose,
  withdrawalAmount
}: Props) => {
  const {
    processWithdrawal,
    isWithdrawalProcessed,
    isProcessingWithdrawal,
    processingWithdrawalError
  } = useProcessWithdrawal()

  const {
    transferFeeData,
    isLoadingTransferFee,
    destinationCardDetails,
    setup2FACloseModalThenNavigateTo2FA
  } = useSummaryWithdrawalPanel({
    onClose,
    withdrawalAmount,
    isWithdrawalProcessed
  })

  const [error, setError] = useState()

  const { transferFeePercentage } = useTransferFeePercentage()

  useEffect(() => {
    if (processingWithdrawalError?.code === 'FOLD-0055')
      setup2FACloseModalThenNavigateTo2FA()
    else if (processingWithdrawalError) setError(processingWithdrawalError)
  }, [processingWithdrawalError])

  const { total, fee_amount, transfer_amount } = transferFeeData

  return (
    <>
      <View style={$container}>
        <LoadingIndicatorOverlay
          isLoading={isLoadingTransferFee}
          style={[$listContainer, $loader]}
          activityIndicatorProps={activityIndicatorProps}
        >
          <ListItemContainer style={$listContainer}>
            <View style={$rowContainer}>
              <LabelAndValue label="From:" value="Fold Card" />

              <LabelAndValue label="To:" value={`${destinationCardDetails}`} />
            </View>

            <View style={$rowContainer}>
              <LabelAndValue
                label="Withdrawal Amount"
                value={`${convertStringToUSD(transfer_amount)}`}
              />

              <LabelAndValue
                value={`${convertStringToUSD(fee_amount)}`}
                label={`Less: Transfer Fee (${transferFeePercentage})`}
              />
            </View>

            <View style={$totalContainer}>
              <Text style={$totalLabel}>Transfer Total</Text>

              <Text style={$totalValue}>{`${convertStringToUSD(total)}`}</Text>
            </View>
          </ListItemContainer>
        </LoadingIndicatorOverlay>

        <View style={$button}>
          <ThemeButton
            text="confirm transfer"
            onPress={processWithdrawal}
            disabled={isProcessingWithdrawal}
            isLoading={isProcessingWithdrawal}
          />
        </View>
      </View>

      <ErrorModal error={error} onClose={onClose} />
    </>
  )
}
