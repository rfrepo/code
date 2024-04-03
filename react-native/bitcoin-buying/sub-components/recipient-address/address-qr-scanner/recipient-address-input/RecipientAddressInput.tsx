import tw from '_deps/lib/tailwind'
import { Button, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '_deps/redux/hooks'
import { useNavigation } from '_deps/shared/hooks/use-navigation/useNavigation'
import { updateRecipientAddress } from 'bitcoin-buying/redux/slice/bitcoinBuyingSlice'
import { selectRecipientAddress } from 'bitcoin-buying/redux/slice/bitcoinBuyingSelectors'
import { styles } from 'bitcoin-buying/sub-components/recipient-address/address-qr-scanner/recipient-address-input/styles'

const { $textInput } = styles

export const RecipientAddressInput = () => {
  const dispatch = useAppDispatch()

  const [address, setAddress] = useState('')

  const [isEnabled, setIsEnabled] = useState(false)

  const scannedAddress = useAppSelector(selectRecipientAddress)

  const { navigateToConfirmWithdraw } = useNavigation('ConfirmWithdraw')

  useEffect(() => {
    setIsEnabled(Boolean(address.length))
  }, [address])

  const handleSubmit = () => {
    dispatch(updateRecipientAddress(address))

    navigateToConfirmWithdraw()
  }

  useEffect(() => {
    if (scannedAddress) setAddress(scannedAddress)
  }, [scannedAddress])

  const handleChange = (text: string) => {
    if (scannedAddress) dispatch(updateRecipientAddress(text))

    setAddress(text)
  }

  return (
    <View>
      <TextInput
        autoFocus
        blurOnSubmit
        value={address}
        multiline={true}
        style={$textInput}
        returnKeyType="done"
        onChangeText={handleChange}
        textAlignVertical={'center'}
        placeholder={'3DMNXy...8JLwMj'}
        placeholderTextColor={tw.color('grey-600')}
      />

      <Button title="NEXT" disabled={!isEnabled} onPress={handleSubmit} />
    </View>
  )
}
