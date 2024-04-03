import React from 'react'
import {
  getMocksCallArgByName,
  mockReturnsValue
} from '_deps/shared/test-utils'
import { useAppSelector } from '_deps/redux/hooks'
import { useNavigation } from '@react-navigation/native'
import { act, render, waitFor } from '@testing-library/react-native'
import { useParseAddressQRScanMutation } from '_deps/api/wallet/walletEndpoints'
import { QRCodeScanner } from 'bitcoin-buying/sub-components/recipient-address/qr-code-scanner/QRCodeScanner'
import { AddressQRScanner } from 'bitcoin-buying/sub-components/recipient-address/address-qr-scanner/AddressQRScanner'
import { AddressScanErrorToast } from 'bitcoin-buying/sub-components/recipient-address/address-qr-scanner/address-scan-error-toast/AddressScanErrorToast'

jest.mock('_deps/redux/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn().mockReturnValue(jest.fn())
}))

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({ goBack: jest.fn() })
}))

jest.mock('_deps/api/wallet/walletEndpoints', () => ({
  useParseAddressQRScanMutation: jest.fn()
}))

jest.mock('_deps/assets/close-red.svg', () => jest.fn().mockReturnValue(null))

jest.mock(
  'bitcoin-buying/sub-components/recipient-address/qr-code-scanner/QRCodeScanner',
  () => ({
    QRCodeScanner: jest.fn().mockReturnValue(null)
  })
)

jest.mock(
  'bitcoin-buying/sub-components/recipient-address/address-qr-scanner/address-scan-error-toast/AddressScanErrorToast',
  () => ({
    AddressScanErrorToast: jest.fn().mockReturnValue(null)
  })
)

describe('AddressQRScanner', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    mockReturnsValue(useAppSelector, {
      address: ''
    })

    mockReturnsValue(useParseAddressQRScanMutation, [
      jest.fn().mockReturnValue({
        data: { address: 'mxncQee1TYz78asyidADpXgsZx3z62kQ4j' }
      }),
      { error: null }
    ])
  })

  it('should render the default state', () => {
    const { getByText } = render(<AddressQRScanner />)

    expect(QRCodeScanner).toHaveBeenCalled()

    expect(getByText(/SCAN A BITCOIN QR CODE/)).toBeDefined()
  })

  it('should validate the address and navigate to the RecipientAddress screen', async () => {
    render(<AddressQRScanner />)

    const onReadCode = getMocksCallArgByName(QRCodeScanner, 'onReadCode')

    const event = {
      nativeEvent: {
        codeStringValue: 'mxncQee1TYz78asyidADpXgsZx3z62kQ4j'
      }
    }

    act(() => {
      onReadCode(event)
    })

    await waitFor(() => {
      expect(useNavigation().goBack).toHaveBeenCalled()
    })
  })

  it('should render an error toast if the address is invalid', async () => {
    mockReturnsValue(useParseAddressQRScanMutation, [
      jest.fn().mockReturnValue({
        data: {}
      }),
      { error: { status: true, data: { code: 'FOLD-0025' } } }
    ])

    render(<AddressQRScanner />)

    await waitFor(() => {
      expect(useNavigation().goBack).not.toHaveBeenCalled()

      expect(AddressScanErrorToast).toHaveBeenCalled()
    })
  })

  it('should not navigate the user back if they ar scanning the same address again', async () => {
    render(<AddressQRScanner />)

    mockReturnsValue(useAppSelector, {
      address: 'mxncQee1TYz78asyidADpXgsZx3z62kQ4j'
    })

    const onReadCode = getMocksCallArgByName(QRCodeScanner, 'onReadCode')

    const event = {
      nativeEvent: {
        codeStringValue: 'mxncQee1TYz78asyidADpXgsZx3z62kQ4j'
      }
    }

    act(() => {
      onReadCode(event)
    })

    await waitFor(() => {
      expect(useNavigation().goBack).not.toHaveBeenCalled()
    })
  })
})
