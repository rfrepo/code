import React from 'react'
import { styles } from './styles'
import { Image, View } from 'react-native'
import { ThemeButton } from 'src/theme/theme-button'
import Img from 'assets/instant-withdrawal-success.png'
import { useNavigation } from '@react-navigation/native'
import Text from 'src/components-lib/components/text/Text'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { SafeTopView } from 'src/components-lib/components/safe-top-view/SafeTopView'
import {
  selectRefererRoute,
  selectWithdrawalAmount
} from 'src/screens/withdraw-funds-from-fold-card/redux/withdrawFundsFromFoldCardSelectors'
import { convertStringToUSD } from 'src/shared/helpers/fiat/convert-string-to-usd/convertStringToUSD'
import { reset2FAConfiguration } from 'src/redux/global-slices/two-factor-authentication/twoFactorAuthenticationV2Slice'
import { resetWithdrawFundsFromFoldCardState } from 'src/screens/withdraw-funds-from-fold-card/redux/withdrawFundsFromFoldCardSlice'
import { batch } from 'react-redux'
import {useStatusbarColor} from 'src/shared/theme-hooks'
import tw from 'lib/tailwind'

const {
  $title,
  $image,
  $curve,
  $content,
  $container,
  $settlementText,
  $curveContainer,
  $buttonContainer,
  $withdrawalSummaryText
} = styles

export const WithdrawalSuccess = () => {
  const dispatch = useAppDispatch()

  const navigator = useNavigation()

  useStatusbarColor(tw.color('bg-brown-300'), true)

  const refererRoute = useAppSelector(selectRefererRoute)

  const withdrawalAmount = useAppSelector(selectWithdrawalAmount)

  const resetWithdrawalFlowDataAndNavigateToRefererRoute = () => {
    navigator.navigate(refererRoute || 'FoldCard')

    batch(() => {
      dispatch(reset2FAConfiguration())

      dispatch(resetWithdrawFundsFromFoldCardState())
    })
  }

  return (
    <SafeTopView style={$container}>
      <Image source={Img} style={$image} />

      <View style={$curveContainer}>
        <View style={$curve} />
      </View>

      <View style={$content}>
        <Text style={$title}>Nicely Done!</Text>

        <Text style={$withdrawalSummaryText}>
          {convertStringToUSD(withdrawalAmount)} transferred from your Fold Card
        </Text>

        <Text style={$settlementText}>
          Funds are on their way and will appear in your debit card shortly
        </Text>

        <View style={$buttonContainer}>
          <ThemeButton
            text="SWEET!"
            onPress={resetWithdrawalFlowDataAndNavigateToRefererRoute}
          />
        </View>
      </View>
    </SafeTopView>
  )
}
