import React from 'react'
import {
  asMock,
  mockReturnsValue,
  getMocksCallArgByName
} from '_deps/shared/test-utils'
import {
  selectFeatureSeen,
  selectPrimaryWallet,
  selectIsWalletEnabled
} from '_deps/redux/global-slices/user/userSelectors'
import { BitcoinBuying } from 'bitcoin-buying/BitcoinBuying'
import { render, waitFor } from '@testing-library/react-native'
import { useNavigation } from '_deps/shared/hooks/use-navigation/useNavigation'
import { LaunchBitcoinBuyingButton } from 'bitcoin-buying/sub-components/launch-bitcoin-buying-button/LaunchBitcoinBuyingButton'

jest.mock('_deps/redux/hooks', () => ({
  useAppSelector: selector => selector()
}))

jest.mock('_deps/redux/global-slices/user/userSelectors', () => ({
  selectPrimaryWallet: jest.fn(),
  selectFeatureSeen: () => jest.fn(),
  selectIsWalletEnabled: jest.fn().mockReturnValue(true)
}))

jest.mock('_deps/shared/hooks/use-navigation/useNavigation', () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigateToBitcoinBuying: jest.fn(),
    navigateToTransitionAgreement: jest.fn()
  })
}))

jest.mock(
  'bitcoin-buying/sub-components/launch-bitcoin-buying-button/LaunchBitcoinBuyingButton',
  () => ({
    LaunchBitcoinBuyingButton: jest.fn().mockReturnValue(null)
  })
)

describe('BitcoinBuying', () => {
  it('should render the default state', async () => {
    render(<BitcoinBuying />)

    await waitFor(() => {
      expect(LaunchBitcoinBuyingButton).toHaveBeenCalled()
    })
  })

  it('should navigate to the bitcoin buying screen', () => {
    render(<BitcoinBuying />)

    getMocksCallArgByName(LaunchBitcoinBuyingButton, 'onPressHandler')()

    expect(useNavigation().navigateToBitcoinBuying).toHaveBeenCalled()
  })

  it('should navigate to the transition agreement screen', () => {
    asMock(selectPrimaryWallet).mockReturnValue(true)

    asMock(selectFeatureSeen('')).mockReturnValue(false)

    render(<BitcoinBuying />)

    getMocksCallArgByName(LaunchBitcoinBuyingButton, 'onPressHandler')()

    expect(useNavigation().navigateToTransitionAgreement).toHaveBeenCalled()
  })

  it('should not render the launch button', () => {
    asMock(LaunchBitcoinBuyingButton).mockClear()

    mockReturnsValue(selectIsWalletEnabled, false)

    render(<BitcoinBuying />)

    expect(LaunchBitcoinBuyingButton).not.toHaveBeenCalled()
  })
})
