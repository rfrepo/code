import React from 'react'
import Text from 'src/components-lib/components/text/Text'
import { LoadingIndicatorOverlay } from 'src/shared/components/loading-indicator/loading-indicator-overlay/LoadingIndicatorOverlay'
import { useGetAstraConfigQuery } from 'src/api/ach/achEndpoints'
import { styles } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/legal-text/styles'
import { ActivityIndicatorProps, View } from 'react-native'
import { useAppSelector } from 'src/redux/hooks'
import { selectInstantDebitWithdrawalDisclaimerFooter } from 'src/api/ach/achSelectors'

const { $container, $text, $loaderColor } = styles

const activityIndicatorProps = {
  color: $loaderColor
} as unknown as ActivityIndicatorProps

export const LegalText = () => {
  const { isLoading } = useGetAstraConfigQuery()

  const footerText = useAppSelector(
    selectInstantDebitWithdrawalDisclaimerFooter
  )

  return (
    <View style={$container}>
      <LoadingIndicatorOverlay
        isLoading={isLoading}
        activityIndicatorProps={activityIndicatorProps}
      >
        <Text style={$text}>{footerText}</Text>
      </LoadingIndicatorOverlay>
    </View>
  )
}
