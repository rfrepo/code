import { styles } from './styles'
import React, { useEffect, useState } from 'react'
import Text from 'src/components-lib/components/text/Text'
import { ActivityIndicatorProps, View } from 'react-native'
import { LoadingIndicatorOverlay } from 'src/shared/components/loading-indicator/loading-indicator-overlay/LoadingIndicatorOverlay'
import { useGetTransferFee } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/hooks/use-get-transfer-fee/useGetTransferFee'
import { useTransferAmountValidation } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/hooks/use-transfer-amount-validation/useTransferAmountValidation'
import { convertStringToUSD } from 'src/shared/helpers/fiat/convert-string-to-usd/convertStringToUSD'
import { useTransferFeePercentage } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/hooks/use-transfer-fee-percentage/useTransferFeePercentage'

type Props = {
  amount: string
}

const activityIndicatorProps = {
  size: 10,
  color: styles.$loaderColor
} as unknown as ActivityIndicatorProps

const { $container, $text, $loadIndicator } = styles

export const WithdrawalFeeText = ({ amount }: Props) => {
  const [calculatedFee, setCalculatedFee] = useState(0)

  const { error } = useTransferAmountValidation(amount)

  const amountAsNumber = Number(amount.replace(/[^0-9.]/g, ''))

  const { getFee, feeAmount, isLoading } = useGetTransferFee()

  const { transferFeePercentage, transferFeePercentageIsLoading } =
    useTransferFeePercentage()

  useEffect(() => {
    if (amountAsNumber === 0 || error) {
      setCalculatedFee(0)

      getFee(0)
    } else {
      getFee(amountAsNumber)
    }
  }, [amountAsNumber, error])

  useEffect(() => {
    setCalculatedFee(feeAmount)
  }, [isLoading])

  const feeText =
    error || amountAsNumber === 0 || !calculatedFee || isLoading
      ? !transferFeePercentageIsLoading &&
        `${transferFeePercentage} transfer fee`
      : `${convertStringToUSD(calculatedFee)} transfer fee`

  return (
    <View style={$container}>
      <LoadingIndicatorOverlay
        isLoading={isLoading}
        style={$loadIndicator}
        activityIndicatorProps={activityIndicatorProps}
      >
        <Text style={$text}>{feeText}</Text>
      </LoadingIndicatorOverlay>
    </View>
  )
}
