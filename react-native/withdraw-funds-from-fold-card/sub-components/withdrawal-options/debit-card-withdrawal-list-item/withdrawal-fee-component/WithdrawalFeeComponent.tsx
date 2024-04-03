import React from 'react'
import { styles } from './styles'
import Text from 'src/components-lib/components/text/Text'
import { ActivityIndicatorProps, View } from 'react-native'
import { LoadingIndicatorOverlay } from 'src/shared/components/loading-indicator/loading-indicator-overlay/LoadingIndicatorOverlay'
import { useTransferFeePercentage } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/hooks/use-transfer-fee-percentage/useTransferFeePercentage'

const { $container, $text, $loaderColor, $loadIndicator } = styles

const activityIndicatorProps = {
  size: 10,
  color: $loaderColor
} as unknown as ActivityIndicatorProps

export const WithdrawalFeeComponent = () => {
  const { transferFeePercentage, transferFeePercentageIsLoading } =
    useTransferFeePercentage()

  return (
    <View style={$container}>
      <LoadingIndicatorOverlay
        isLoading={transferFeePercentageIsLoading}
        style={$loadIndicator}
        activityIndicatorProps={activityIndicatorProps}
      >
        <Text style={$text}>{transferFeePercentage} FEE</Text>
      </LoadingIndicatorOverlay>
    </View>
  )
}
