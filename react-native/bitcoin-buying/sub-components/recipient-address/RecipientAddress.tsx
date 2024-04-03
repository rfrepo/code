import React from 'react'
import Text from '_deps/text/Text'
import { Linking, View } from 'react-native'
import { BITCOIN_ADDRESSES_SUPPORT_URL } from '_deps/config-urls'
import { styles } from 'bitcoin-buying/sub-components/recipient-address/styles'
import { RecipientAddressInput } from 'bitcoin-buying/sub-components/recipient-address/address-qr-scanner/recipient-address-input/RecipientAddressInput'
import { HeaderWithBackButtonAndTitleAndCameraIcon } from '_deps/shared/components/header/header-with-back-button-and-title-and-camera-icon/HeaderWithBackButtonAndTitleAndCameraIcon'

const { $link, $title, $infoRow, $titleInfo } = styles

export const RecipientAddress = () => {
  const onPress = () => Linking.openURL(BITCOIN_ADDRESSES_SUPPORT_URL)

  return (
    <View>
      <HeaderWithBackButtonAndTitleAndCameraIcon title="Send Bitcoin" />

      <Text style={$title}>Enter a recipient address</Text>

      <View style={$infoRow}>
        <Text style={$titleInfo}>Bitcoin addresses only. </Text>

        <Text style={$link} onPress={onPress}>
          Learn more
        </Text>
      </View>

      <RecipientAddressInput />
    </View>
  )
}
