import React from 'react'
import { asMock } from '_deps/shared/test-utils'
import { useNavigation } from '@react-navigation/native'
import { fireEvent, render } from '@testing-library/react-native'
import { useAppDispatch, useAppSelector } from '_deps/redux/hooks'
import { updateIsFirstTimeBuyer } from 'bitcoin-buying/redux/slice/bitcoinBuyingSlice'
import { PurchaseSuccess } from 'bitcoin-buying/sub-components/purchase-success/PurchaseSuccess'

jest.mock('_deps/redux/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn().mockReturnValue(jest.fn())
}))

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({
    reset: jest.fn(),
    navigate: jest.fn()
  })
}))

jest.mock('_deps/assets/robot-with-coins.png', () => null)

jest.mock('bitcoin-buying/sub-components/assets/curve.svg', () =>
  jest.fn().mockReturnValue(null)
)

jest.mock('_deps/api/wallet/walletEndpoints', () => ({
  useExecuteQuoteMutation: jest.fn(() => [
    null,
    {
      data: {
        settlement_string:
          'sats are being transferred to your Fold Wallet. Trades usually settle within a few minutes, but may take up to 1 business day'
      },
      isSuccess: true
    }
  ])
}))

jest.mock(
  'bitcoin-buying/sub-components/purchase-success/sub-components/content-image/ContentImage',
  () => ({ ContentImage: jest.fn().mockReturnValue(null) })
)

describe('PurchaseSuccess', () => {
  beforeEach(() => {
    asMock(useAppSelector).mockReturnValue(null)
  })

  it('should render correctly, display the bitcoin decimal converted to sats, and call the isFirstTimeBuyer dispatch with false', () => {
    render(<PurchaseSuccess />)

    expect(useAppDispatch()).toHaveBeenCalledWith({
      payload: false,
      type: updateIsFirstTimeBuyer.type
    })
  })

  it('should render correctly, display full purchase success message coming from the backend', () => {
    const { getByText } = render(<PurchaseSuccess />)

    expect(getByText(/Purchase Confirmed!/)).toBeDefined()

    expect(
      getByText(
        /sats are being transferred to your Fold Wallet\. Trades usually settle within a few minutes, but may take up to 1 business day/
      )
    ).toBeDefined()

    expect(useAppDispatch()).toHaveBeenCalledWith({
      payload: false,
      type: updateIsFirstTimeBuyer.type
    })
  })

  it('should navigate to the dashboard when the button is pressed', () => {
    const { getByText } = render(<PurchaseSuccess />)

    fireEvent.press(getByText('SWEET!'))

    expect(useNavigation().reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'Dashboard' }]
    })
  })
})
