import React from 'react'
import tw from 'lib/tailwind'
import { OPEN_NEW_SUPPORT_TICKET } from 'src/config-urls'
import { ActivityIndicator, Linking, Platform, Text, View } from 'react-native'
import { styles } from 'src/screens/two-factor-authentication/sub-components/ButtonContainer/styles'
import { useCreate2FACodeMutation } from 'src/api/twoFactorAuthentication/twoFactorAuthenticationEndpoints'

type Props = {
  isResendingCode: boolean
  setIsResendingCode: (resendCode: boolean) => void
}
const loaderSize = Platform.OS === 'ios' ? 'small' : 'large'

const { $link, $infoRow, $titleInfo, $loadingContainer } = styles

const loaderColor = tw.color(Platform.OS === 'ios' ? 'grey-1000' : 'black')

export const TwoFactorRecoveryOption = ({
  isResendingCode,
  setIsResendingCode
}: Props) => {
  const [create2FACode] = useCreate2FACodeMutation()

  const handleResendCodePressed = () => {
    create2FACode()

    setIsResendingCode(true)

    setTimeout(() => setIsResendingCode(false), 500)
  }

  const onPressContactSupport = () => Linking.openURL(OPEN_NEW_SUPPORT_TICKET)

  return isResendingCode ? (
    <View style={$loadingContainer}>
      <ActivityIndicator size={loaderSize} color={loaderColor} />
    </View>
  ) : (
    <>
      <View style={$infoRow}>
        <Text style={$titleInfo}>{`Didn't get anything?`}</Text>

        <Text style={$link} onPress={handleResendCodePressed}>
          Resend code
        </Text>
      </View>

      <View style={$infoRow}>
        <Text style={$titleInfo}>Having problems?</Text>

        <Text style={$link} onPress={onPressContactSupport}>
          Contact support
        </Text>
      </View>
    </>
  )
}
