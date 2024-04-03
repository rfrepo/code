import React from 'react'
import { Input } from 'styled'
import PasswordResetForm from '../PasswordResetForm'
import { act, render, waitFor } from '@testing-library/react'
import { validatePasswordLength } from 'components/password-reset-form/hooks/use-password-validation/usePasswordValidation'
import useUpdateCustomerPassword from 'components/password-reset-form/hooks/use-update-customer-password/useUpdateCustomerPassword'

jest.mock('components/password-reset-form/styled', () => ({
  ...jest.requireActual('components/password-reset-form/styled'),
  ErrorMessage: <div>Error updating password</div>,
  errorExceededChars: <div>Exceeded characters</div>,
  SuccessMessage: <div>Password Successfully updated</div>
}))

jest.mock('styled', () => ({
  ...jest.requireActual('styled'),
  Input: jest.fn().mockReturnValue(null),
  UpdateButton: jest.fn().mockReturnValue(null)
}))

jest.mock('@dunelm/tooling/integrations', () => ({
  reportSignInDetailsUpdate: jest.fn()
}))

jest.mock('@dunelm/tooling/integrations/enums/MyAccount', () => ({
  UpdatedSignInDetailType: { Password: jest.fn() }
}))

jest.mock(
  'components/password-reset-form/hooks/use-update-customer-password/useUpdateCustomerPassword',
  () =>
    jest.fn().mockReturnValue({
      errorUpdatingPassword: false
    })
)

jest.mock(
  'components/password-reset-form/caps-lock-indicator/CapsLockIndicator',
  () => ({
    CapsLockIndicator: jest.fn().mockReturnValue(null)
  })
)

jest.mock(
  'components/password-reset-form/validation-check-list/ValidationCheckList',
  () => ({
    ValidationCheckList: jest.fn().mockReturnValue(null)
  })
)

jest.mock(
  'components/password-reset-form/password-obfuscation-toggle/PasswordObfuscationToggle',
  () => ({
    PasswordObfuscationToggle: jest.fn().mockReturnValue(null)
  })
)

jest.mock(
  'components/password-reset-form/hooks/use-password-validation/usePasswordValidation',
  () => ({
    validatePasswordLength: jest.fn().mockReturnValue(false),
    usePasswordValidation: jest
      .fn()
      .mockReturnValue({ validatePassword: jest.fn(), validationResults: {} })
  })
)

let renderResult: ReturnType<typeof render>

describe('PasswordResetForm', () => {
  beforeEach(() => {
    const mockInput = Input as unknown as jest.Mock

    mockInput.mockClear()

    renderResult = render(<PasswordResetForm />)
  })

  it('should render as expected', async () => {
    const { getByText } = renderResult

    await waitFor(() => {
      expect(
        getByText(
          /Update your password regularly so your account stays secure./
        )
      ).toBeDefined()
    })
  })

  it('should render exceeded character error message', async () => {
    const mockInput = Input as unknown as jest.Mock

    const validatePasswordLengthMock = validatePasswordLength as jest.Mock

    const simulatePasswordValidation = mockInput.mock.calls[0][0].onChange

    validatePasswordLengthMock.mockReturnValue(true)

    act(() => {
      simulatePasswordValidation({ currentTarget: { value: '' } })
    })

    renderResult.debug()

    await waitFor(() => {
      expect(renderResult.getByText(/Exceeded characters/)).toBeDefined()

      validatePasswordLengthMock.mockReturnValue(false)
    })
  })

  it('should render updating password error message', async () => {
    const useUpdateCustomerPasswordMock = useUpdateCustomerPassword as jest.Mock

    expect(renderResult.queryByText(/Error updating password/)).toBeNull()

    useUpdateCustomerPasswordMock.mockReturnValue({
      errorUpdatingPassword: true
    })

    renderResult = render(<PasswordResetForm />)

    await waitFor(() => {
      expect(renderResult.getByText(/Error updating password/)).toBeDefined()
    })
  })

  it('should render updating password success', async () => {
    const useUpdateCustomerPasswordMock = useUpdateCustomerPassword as jest.Mock

    expect(renderResult.queryByText(/Password Successfully updated/)).toBeNull()

    useUpdateCustomerPasswordMock.mockReturnValue({
      passwordSuccessfullyUpdated: true
    })

    renderResult = render(<PasswordResetForm />)

    await waitFor(() => {
      expect(
        renderResult.getByText(/Password Successfully updated/)
      ).toBeDefined()
    })
  })
})
