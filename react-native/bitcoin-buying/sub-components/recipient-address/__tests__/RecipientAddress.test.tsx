import React from 'react'
import { Linking } from 'react-native'
import '@testing-library/jest-native/extend-expect'
import { useNavigation } from '_deps/shared/hooks/use-navigation/useNavigation'
import { act, fireEvent, render, waitFor } from '@testing-library/react-native'
import { RecipientAddress } from 'bitcoin-buying/sub-components/recipient-address/RecipientAddress'
import { useAppDispatch } from '_deps/redux/hooks'

jest.mock('_deps/redux/hooks', () => ({
  useAppSelector: selector => selector(),
  useAppDispatch: jest.fn().mockReturnValue(jest.fn())
}))

jest.mock('_deps/shared/hooks/use-navigation/useNavigation', () => ({
  useNavigation: jest
    .fn()
    .mockReturnValue({ navigateToConfirmWithdraw: jest.fn() }),
  useRoute: jest.fn().mockReturnValue({ params: { scannedAddress: null } })
}))

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn().mockReturnValue({ top: 1 })
}))

jest.mock('bitcoin-buying/redux/slice/bitcoinBuyingSelectors', () => ({
  selectRecipientAddress: jest.fn()
}))

jest.mock(
  '_deps/shared/components/header/header-with-back-button-and-title/HeaderWithBackButtonAndTitle',
  () => ({
    HeaderWithBackButtonAndTitle: jest.fn().mockReturnValue(null)
  })
)

jest.mock(
  '_deps/shared/components/header/header-with-back-button-and-title-and-camera-icon/HeaderWithBackButtonAndTitleAndCameraIcon',
  () => ({
    HeaderWithBackButtonAndTitleAndCameraIcon: jest.fn().mockReturnValue(null)
  })
)

describe('RecipientAddress', () => {
  it('should render the default state', () => {
    const { getByText } = render(<RecipientAddress />)

    expect(getByText(/Enter a recipient address/)).toBeDefined()
  })

  it('should navigate to ConfirmWithdraw when text is typed into the input', async () => {
    const { getByPlaceholderText, getByText } = render(<RecipientAddress />)

    const input = getByPlaceholderText('3DMNXy...8JLwMj')

    act(() => {
      fireEvent.changeText(input, '1234')
    })

    act(() => {
      fireEvent.press(getByText(/NEXT/))
    })

    await waitFor(() => {
      expect(useAppDispatch()).toHaveBeenCalled()

      expect(useNavigation().navigateToConfirmWithdraw).toHaveBeenCalled()
    })
  })

  it('should not navigate to ConfirmWithdraw when text is not typed into the input', () => {
    const { getByText } = render(<RecipientAddress />)

    const button = getByText(/NEXT/)

    expect(button).toBeDisabled()
  })

  it('should navigate to the Bitcoin addresses help article when "learn more" is pressed', () => {
    const LinkingSpy = jest.spyOn(Linking, 'openURL')

    const { getByText } = render(<RecipientAddress />)

    act(() => {
      fireEvent.press(getByText(/Learn more/))
    })

    expect(LinkingSpy).toHaveBeenCalledWith(
      'https://support.foldapp.com/hc/en-us/articles/9959126329883'
    )
  })
})
