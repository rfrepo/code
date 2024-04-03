import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '_deps/redux/hooks'
import { useNavigation } from '@react-navigation/native'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { ParseAddressQRScanResponse } from '_deps/api/wallet/types'
import { useParseAddressQRScanMutation } from '_deps/api/wallet/walletEndpoints'
import { updateRecipientAddress } from 'bitcoin-buying/redux/slice/bitcoinBuyingSlice'
import { styles } from 'bitcoin-buying/sub-components/recipient-address/address-qr-scanner/styles'
import { QRCodeScanner } from 'bitcoin-buying/sub-components/recipient-address/qr-code-scanner/QRCodeScanner'
import { AddressScanErrorToast } from 'bitcoin-buying/sub-components/recipient-address/address-qr-scanner/address-scan-error-toast/AddressScanErrorToast'

const { $text, $textContainer } = styles

const isFetchBaseQueryError = (arg: unknown): arg is FetchBaseQueryError =>
  (arg as FetchBaseQueryError)?.status !== undefined

const isParseAddressQRScanResponse = (
  arg: any
): arg is ParseAddressQRScanResponse =>
  (arg as ParseAddressQRScanResponse)?.data !== undefined

export const AddressQRScanner = () => {
  const dispatch = useAppDispatch()

  const navigation = useNavigation()

  const [readCode, setReadCode] = useState('')

  const [error, setError] = useState<any>(null)

  const [parseAddressQRScan, { error: parsingError }] =
    useParseAddressQRScanMutation()

  const parseAddress = async () => {
    const response = await parseAddressQRScan({
      raw_data: readCode
    })

    if (isParseAddressQRScanResponse(response)) {
      const { data } = response

      if (!data?.address && data?.lightning) setError(response)
      else if (data?.address) {
        dispatch(updateRecipientAddress(data.address))

        navigation.goBack()
      }
    } else {
      setError(response)
    }
  }

  useEffect(() => {
    if (isFetchBaseQueryError(parsingError))
      if (parsingError?.data) setError(parsingError?.data)
  }, [parsingError])

  useEffect(() => {
    if (readCode) parseAddress()
  }, [readCode])

  const onReadCode = async (event: any) => {
    const { codeStringValue } = event.nativeEvent

    setReadCode(codeStringValue)
  }

  return (
    <View>
      {error && <AddressScanErrorToast error={error} />}

      <QRCodeScanner onReadCode={onReadCode} />

      <View style={$textContainer}>
        <View>
          <Text style={$text}>SCAN A BITCOIN QR CODE</Text>
        </View>
      </View>
    </View>
  )
}
