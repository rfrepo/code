import React from 'react'
import { render, waitFor } from '@testing-library/react'
import MyAccountSignInDetails from '../MyAccountSignInDetails'

jest.mock('styled', () => ({
  ...jest.requireActual('styled'),
  MyAccountPadlockIcon: jest
    .fn()
    .mockReturnValue(<div data-testid="padlock-icon" />),
  MyAccountDetailsTitle: jest
    .fn()
    .mockReturnValue(<div data-testid="details-title" />)
}))

jest.mock('components/email-card-and-form/EmailCardAndForm', () => ({
  EmailCardAndForm: jest
    .fn()
    .mockReturnValue(<div data-testid="email-card-and-form" />)
}))

jest.mock('hooks/useMyAccountSignInDetailsGAEvent', () => jest.fn())

jest.mock('components/password-reset-form/PasswordResetForm', () =>
  jest.fn().mockReturnValue(<div data-testid="password-reset-form" />)
)

describe('MyAccountSignInDetails', () => {
  let renderResult: ReturnType<typeof render>

  beforeEach(() => {
    renderResult = render(<MyAccountSignInDetails />)
  })

  it('should render header, email-card-and-form card and password reset form', async () => {
    const { getByTestId } = renderResult

    await waitFor(() => {
      expect(getByTestId('padlock-icon')).toBeDefined()

      expect(getByTestId('details-title')).toBeDefined()

      expect(getByTestId('my-account-sign-in')).toBeDefined()

      expect(getByTestId('email-card-and-form-card-and-form')).toBeDefined()

      expect(getByTestId('password-reset-form')).toBeDefined()
    })
  })
})
