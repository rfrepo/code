import Text from '_deps/text/Text'
import React, { useEffect } from 'react'
import { Button, View } from 'react-native'
import { useAppDispatch } from '_deps/redux/hooks'
import { useNavigation } from '@react-navigation/native'
import { useExecuteQuoteMutation } from '_deps/api/wallet/walletEndpoints'
import BackgroundCurve from 'bitcoin-buying/sub-components/assets/curve.svg'
import { styles } from 'bitcoin-buying/sub-components/purchase-success/styles'
import { updateIsFirstTimeBuyer } from 'bitcoin-buying/redux/slice/bitcoinBuyingSlice'
import { DynamicContentRenderer } from '_deps/ui/dynamic-content-renderer/DynamicContentRenderer'
import { ContentImage } from 'bitcoin-buying/sub-components/purchase-success/sub-components/content-image/ContentImage'

const {
  $title,
  $settlementText,
  $buttonContainer,
  $settlementBoldText,
  $spinRewardBadgeContainer
} = styles

export const PurchaseSuccess = () => {
  const dispatch = useAppDispatch()

  const navigator = useNavigation()

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(updateIsFirstTimeBuyer(false))
    }
  })

  const [, result] = useExecuteQuoteMutation({ fixedCacheKey: 'executeQuote' })

  const replaceWithDashboard = () => {
    navigator.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }]
    } as Parameters<typeof navigator.reset>[0])
  }

  const { settlement_string } = result.data || {}

  return (
    <View>
      <BackgroundCurve />

      <View style={$spinRewardBadgeContainer} />

      <ContentImage />

      <Text style={$title}>Purchase Confirmed!</Text>

      <DynamicContentRenderer
        contentString={settlement_string}
        styles={{
          $paragraph: $settlementText,
          $highlighted: $settlementBoldText
        }}
      />

      <View style={$buttonContainer}>
        <Button title="SWEET!" onPress={replaceWithDashboard} />
      </View>
    </View>
  )
}
