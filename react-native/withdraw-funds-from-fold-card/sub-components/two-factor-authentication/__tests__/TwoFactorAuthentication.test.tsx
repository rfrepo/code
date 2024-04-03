import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  waitFor
} from '@testing-library/react-native'
import { Linking, Text } from 'react-native'
import { OPEN_NEW_SUPPORT_TICKET } from 'src/config-urls'
import { mockReturnsValue } from 'src/shared/test-utils'
import {
  useCreate2FACodeMutation,
  useVerify2FACodeMutation
} from 'src/api/twoFactorAuthentication/twoFactorAuthenticationEndpoints'
import { ThemeButton } from 'src/theme/theme-button'
import { use2FAProtectedAction } from 'src/screens/two-factor-authentication/use2FAProtectedAction'
import { TwoFactorAuthenticationScreen } from 'src/screens/two-factor-authentication/TwoFactorAuthenticationScreen'

jest.useFakeTimers()

jest.mock('assets/back.svg', () => () => null)

jest.mock('assets/close-black.svg', () => jest.fn().mockReturnValue(null))

jest.mock('assets/close-red.svg', () => () => null)

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 1
  })
}))

jest.mock('src/redux/hooks', () => ({
  useAppSelector: jest
    .fn()
    .mockImplementation((mockedSelector: () => any) => mockedSelector())
}))

jest.mock('src/api/profile/profileEndpoints', () => ({
  useGetProfileQuery: () => ({ refetch: jest.fn() })
}))

jest.mock(
  'src/redux/global-slices/twoFactorAuthentication/twoFactorAuthenticationSelectors',
  () => ({
    select2FASettings: () => ({
      useAstra: false,
      buttonTitle: 'CONFIRM',
      protectedActionArgs: { source_id: '123', amount: '10' },
      previousScreen: 'ConfirmWithdraw',
      scope: '/v1/wallet/withdraw',
      navigateOnSuccess: () => {}
    })
  })
)

jest.mock(
  'src/screens/two-factor-authentication/use2FAProtectedAction',
  () => ({
    use2FAProtectedAction: jest.fn(() => ({
      twoFactorProtectedAction: jest.fn(),
      navigateOnSuccess: jest.fn(),
      isLoading: false,
      error: false,
      reset: jest.fn()
    }))
  })
)

jest.mock('src/redux/global-slices/user/userSelectors', () => ({
  selectPhoneNumber: () => '+01234567890'
}))

jest.mock(
  'src/screens/bitcoin-buying/redux/slice/bitcoinBuyingSelectors',
  () => ({
    selectRecipientAddress: () => 'mkHS9ne12qx9pS9VojpwU5xtRd4T7X7ZUt'
  })
)

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn()
  })
}))

jest.mock(
  'src/api/twoFactorAuthentication/twoFactorAuthenticationEndpoints',
  () => ({
    useVerify2FACodeMutation: jest.fn(),
    useCreate2FACodeMutation: jest.fn()
  })
)

jest.mock('src/theme/theme-button', () => ({
  ThemeButton: jest.fn().mockReturnValue(null)
}))

describe('TwoFactorAuthenticationScreen', () => {
  beforeEach(() => {
    const mockThemeButton = ThemeButton as unknown as jest.Mock

    mockThemeButton.mockImplementation(({ text, onPress }) => (
      <Text onPress={onPress}>{text}</Text>
    ))

    mockReturnsValue(useCreate2FACodeMutation, [jest.fn()])

    mockReturnsValue(useVerify2FACodeMutation, [
      jest.fn().mockReturnValue({ data: { token: 'token' } }),
      { error: undefined, isLoading: false, reset: jest.fn() }
    ])
  })

  afterEach(cleanup)

  it('should render the screen without issues', () => {
    const { getByText } = render(<TwoFactorAuthenticationScreen />)

    expect(getByText('Enter code sent to')).toBeDefined()

    expect(getByText("Didn't get anything?")).toBeDefined()

    expect(getByText('Having problems?')).toBeDefined()
  })

  it('should call create2FACode when Resend code is pressed', () => {
    const mockCreate2FAcode = jest.fn()

    mockReturnsValue(useCreate2FACodeMutation, [mockCreate2FAcode])

    const { getByText } = render(<TwoFactorAuthenticationScreen />)

    const resendCodeButton = getByText('Resend code')

    fireEvent.press(resendCodeButton)

    expect(mockCreate2FAcode).toHaveBeenCalled()
  })

  it('should open a Link to OPEN_NEW_SUPPORT_TICKET when Contact support is called', () => {
    const mockCreate2FAcode = jest.fn()

    mockReturnsValue(useCreate2FACodeMutation, [mockCreate2FAcode])

    const { getByText } = render(<TwoFactorAuthenticationScreen />)

    const contactSupportButton = getByText('Contact support')

    fireEvent.press(contactSupportButton)

    expect(Linking.openURL).toHaveBeenCalledWith(OPEN_NEW_SUPPORT_TICKET)
  })

  it('should call verify2FACode and twoFactorProtectedAction when the correct code is entered', async () => {
    const mockConfirmTransfer = jest.fn().mockReturnValue({ error: undefined })

    mockReturnsValue(use2FAProtectedAction, {
      twoFactorProtectedAction: mockConfirmTransfer,
      navigateOnSuccess: jest.fn(),
      isLoading: false,
      error: null,
      reset: jest.fn()
    })

    const mockVerify2FACode = jest
      .fn()
      .mockReturnValue({ data: { token: 'token' } })

    mockReturnsValue(useVerify2FACodeMutation, [
      mockVerify2FACode,
      { error: undefined, isLoading: false, reset: jest.fn() }
    ])

    const { getByText, getByPlaceholderText } = render(
      <TwoFactorAuthenticationScreen />
    )

    const input = getByPlaceholderText('Enter code')

    fireEvent.changeText(input, '00000000')

    const button = getByText('CONFIRM')

    await waitFor(() => {
      fireEvent.press(button)
    })

    expect(mockVerify2FACode).toHaveBeenCalledWith({
      scope: '/v1/wallet/withdraw',
      code: '00000000'
    })

    expect(mockConfirmTransfer).toHaveBeenCalledWith({
      token: 'token',
      source_id: '123',
      amount: '10'
    })
  })

  it('should display an error when the incorrect 2fa code is entered', () => {
    mockReturnsValue(use2FAProtectedAction, {
      twoFactorProtectedAction: jest.fn().mockReturnValue({ error: true }),
      navigateOnSuccess: jest.fn(),
      isLoading: false,
      error: { data: { code: 'FOLD-0022' } },
      reset: jest.fn()
    })

    const { getByText, getByPlaceholderText } = render(
      <TwoFactorAuthenticationScreen />
    )

    const input = getByPlaceholderText('Enter code')

    fireEvent.changeText(input, '00000000')

    const button = getByText('CONFIRM')

    fireEvent.press(button)

    expect(getByText('Incorrect code. Resend and try again.')).toBeDefined()
  })

  it('should display an error when confirmWithdraw returns with an error', async () => {
    mockReturnsValue(use2FAProtectedAction, {
      twoFactorProtectedAction: jest.fn().mockReturnValue({ error: true }),
      navigateOnSuccess: jest.fn(),
      isLoading: false,
      error: { data: { code: 'FOLD-0000' } },
      reset: jest.fn()
    })

    const { getByText, getByPlaceholderText } = render(
      <TwoFactorAuthenticationScreen />
    )

    const input = getByPlaceholderText('Enter code')

    fireEvent.changeText(input, '00000000')

    const button = getByText('CONFIRM')

    await waitFor(() => {
      fireEvent.press(button)
    })

    expect(getByText('Error')).toBeDefined()
  })

  it('should display a specific error when confirmWithdraw returns with an error with a code of FOLD-0025', async () => {
    mockReturnsValue(use2FAProtectedAction, {
      twoFactorProtectedAction: jest.fn().mockReturnValue({ error: true }),
      navigateOnSuccess: jest.fn(),
      isLoading: false,
      error: { data: { code: 'FOLD-0025' } },
      reset: jest.fn()
    })

    const { getByText, getByPlaceholderText } = render(
      <TwoFactorAuthenticationScreen />
    )

    const input = getByPlaceholderText('Enter code')

    fireEvent.changeText(input, '00000000')

    const button = getByText('CONFIRM')

    await waitFor(() => {
      fireEvent.press(button)
    })

    expect(getByText('Invalid Address')).toBeDefined()
  })
})
