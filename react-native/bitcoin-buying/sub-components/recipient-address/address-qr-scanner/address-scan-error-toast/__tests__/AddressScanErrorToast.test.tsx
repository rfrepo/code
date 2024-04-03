import React from 'react'
import { render } from '@testing-library/react-native'
import { AddressScanErrorToast } from 'bitcoin-buying/sub-components/recipient-address/address-qr-scanner/address-scan-error-toast/AddressScanErrorToast'
import { ParseAddressResponse } from 'bitcoin-buying/sub-components/recipient-address/address-qr-scanner/address-scan-error-toast/types'

jest.mock('_deps/assets/close-red.svg', () => jest.fn().mockReturnValue(null))

describe('AddressScanErrorToast', () => {
  let mockError: ParseAddressResponse

  beforeEach(() => {
    mockError = {
      code: '',
      lightning: ''
    } as ParseAddressResponse
  })

  const renderComponentAndAssertMessage = (
    error: ParseAddressResponse,
    message: string
  ) => {
    const { getByText } = render(<AddressScanErrorToast error={error} />)

    expect(getByText(message)).toBeDefined()
  }

  it('should render lightning error message', () => {
    mockError.lightning = 'LNBC1...'

    renderComponentAndAssertMessage(
      mockError,
      'This is a lightning invoice not a Bitcoin address'
    )
  })

  it('should render invalid address error message', () => {
    mockError.code = 'FOLD-0025'

    renderComponentAndAssertMessage(
      mockError,
      'This is not a valid Bitcoin address'
    )
  })

  it('should render the generic error message', () => {
    renderComponentAndAssertMessage(
      {} as ParseAddressResponse,
      'Something went wrong. Please try again'
    )
  })
})
