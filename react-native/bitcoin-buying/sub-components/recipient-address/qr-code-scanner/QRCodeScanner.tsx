import {
  View,
  Platform,
  Pressable,
  Dimensions,
  PermissionsAndroid
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import WhiteCloseButton from '_deps/assets/close-white.svg'
import { Camera, CameraType } from 'react-native-camera-kit'
import { styles } from 'bitcoin-buying/sub-components/recipient-address/qr-code-scanner/styles'

const hitslop = {
  top: 30,
  left: 30,
  right: 30,
  bottom: 30
}

type QrCodeScannerProps = {
  onReadCode: (event: unknown) => void
}

const { height, width } = Dimensions.get('window')

const { $whiteCloseButton, $scannerView } = styles

export const QRCodeScanner = ({ onReadCode }: QrCodeScannerProps) => {
  const cameraRef = useRef()

  const { goBack } = useNavigation()

  const [hasCameraPermission, setHasCameraPermission] = useState(false)

  const enableCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          buttonPositive: 'OK',
          title: 'Camera Permission',
          message: 'App needs camera permission'
        }
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasCameraPermission(true)
      }
    } else {
      setHasCameraPermission(true)
    }
  }

  useEffect(() => {
    enableCameraPermission()
  }, [])

  if (!hasCameraPermission) return null

  return (
    <View>
      <Pressable
        onPress={goBack}
        hitSlop={hitslop}
        testID={'close-button'}
        style={$whiteCloseButton}
      >
        <WhiteCloseButton />
      </Pressable>

      <Camera
        ref={cameraRef}
        scanBarcode={true}
        onReadCode={onReadCode}
        style={{ height, width }}
        cameraType={CameraType.Back}
      />

      <View style={$scannerView} />
    </View>
  )
}
