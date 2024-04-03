import React from 'react'
import { Camera } from 'react-native-camera-kit'
import { useNavigation } from '@react-navigation/native'
import { PermissionsAndroid, Platform } from 'react-native'
import { fireEvent, render } from '@testing-library/react-native'
import { QRCodeScanner } from 'bitcoin-buying/sub-components/recipient-address/qr-code-scanner/QRCodeScanner'
import { asMock } from '_deps/shared/test-utils'

jest.mock('react-native-camera-kit', () => ({
  Camera: jest.fn().mockReturnValue(null),
  CameraType: {
    Front: 'front',
    Back: 'back'
  }
}))

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({ goBack: jest.fn() })
}))

jest.mock('_deps/assets/close-white.svg', () => jest.fn().mockReturnValue(null))

describe('QRCodeScanner', () => {
  beforeEach(() => {
    asMock(Camera).mockClear()
  })

  it('should render on iOS', () => {
    Platform.OS = 'ios'

    render(<QRCodeScanner onReadCode={jest.fn} />)

    expect(Camera).toHaveBeenCalled()
  })

  it('should call goBack when the close button is pressed', () => {
    const { getByTestId } = render(<QRCodeScanner onReadCode={jest.fn} />)

    const closeButton = getByTestId('close-button')

    fireEvent.press(closeButton)

    expect(useNavigation().goBack).toHaveBeenCalled()
  })

  it('should request camera permission on Android and render the camera', async () => {
    Platform.OS = 'android'

    PermissionsAndroid.request = jest
      .fn()
      .mockResolvedValue(PermissionsAndroid.RESULTS.GRANTED)

    render(<QRCodeScanner onReadCode={jest.fn} />)

    await expect(PermissionsAndroid.request).toHaveBeenCalledWith(
      'android.permission.CAMERA',
      {
        buttonPositive: 'OK',
        message: 'App needs camera permission',
        title: 'Camera Permission'
      }
    )

    expect(Camera).toHaveBeenCalled()
  })

  it('should not render camera on andriod when permission is denied', async () => {
    Platform.OS = 'android'

    PermissionsAndroid.request = jest
      .fn()
      .mockResolvedValue('denied')

    render(<QRCodeScanner onReadCode={jest.fn} />)

    await expect(PermissionsAndroid.request).toHaveBeenCalledWith(
      'android.permission.CAMERA',
      {
        buttonPositive: 'OK',
        message: 'App needs camera permission',
        title: 'Camera Permission'
      }
    )

    expect(Camera).not.toHaveBeenCalled()
  })
})
