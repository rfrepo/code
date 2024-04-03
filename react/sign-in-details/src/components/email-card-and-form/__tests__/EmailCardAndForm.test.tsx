import React from 'react'
import { act, render, waitFor } from '@testing-library/react'
import { EmailCard } from 'components/email-card-and-form/email-card/EmailCard'
import { EmailForm } from 'components/email-card-and-form/email-form/EmailForm'
import { EmailCardAndForm } from 'components/email-card-and-form/EmailCardAndForm'

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn().mockReturnValue({
    user: { email: 'email@domain.com' }
  })
}))

jest.mock('styled', () => ({
  FormSection: jest
    .fn()
    .mockImplementation(({ children, ...rest }) => (
      <div {...rest}>{children}</div>
    ))
}))

jest.mock('components/email-card-and-form/styled', () => ({
  CardHeading: jest
    .fn()
    .mockImplementation(({ children, ...rest }) => (
      <div {...rest}>{children}</div>
    ))
}))

jest.mock('components/password-reset-form/styled', () => ({
  SuccessMessage: <div data-testid="email-updated-success-message" />
}))

jest.mock('components/email-card-and-form/email-card/EmailCard', () => ({
  EmailCard: jest.fn().mockReturnValue(<div data-testid="email-card" />)
}))

jest.mock('components/email-card-and-form/email-form/EmailForm', () => ({
  EmailForm: jest.fn().mockReturnValue(<div data-testid="email-form" />)
}))

describe('EmailCardAndForm', () => {
  let renderResult: ReturnType<typeof render>

  const EmailCardMock = EmailCard as jest.Mock

  const EmailFormMock = EmailForm as jest.Mock

  beforeEach(() => {
    EmailCardMock.mockClear()

    EmailFormMock.mockClear()

    renderResult = render(<EmailCardAndForm />)
  })

  const callMockPropFn = (mockFn: jest.Mock, prop: string) => {
    const mockCall = mockFn.mock.calls[0][0][prop]

    act(() => {
      mockCall()
    })
  }

  const enterEditMode = () => {
    callMockPropFn(EmailCardMock, 'enterEditMode')
  }

  it('should render the static email card as the initial state', async () => {
    const { getByText, queryByTestId } = renderResult

    await waitFor(() => {
      expect(getByText(/Your Email Address/)).toBeDefined()

      expect(EmailCardMock).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'email@domain.com',
          enterEditMode: expect.any(Function)
        }),
        {}
      )

      expect(queryByTestId('email-form')).toBeNull()
    })
  })

  it('should render the editable email input form', () => {
    enterEditMode()

    const { queryByTestId } = renderResult

    expect(EmailFormMock).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'email@domain.com',
        onCancel: expect.any(Function),
        onUpdateSuccess: expect.any(Function)
      }),
      {}
    )

    expect(queryByTestId('email-card')).toBeNull()
  })

  it('should render the email updated message', async () => {
    const { getByTestId } = renderResult

    enterEditMode()

    callMockPropFn(EmailFormMock, 'onUpdateSuccess')

    expect(getByTestId('email-updated-success-message')).toBeDefined()
  })

  it('should cancel out of edit mode', async () => {
    const { getByTestId, queryByTestId } = renderResult

    enterEditMode()

    callMockPropFn(EmailFormMock, 'onCancel')

    expect(queryByTestId('email-form')).toBeNull()

    expect(getByTestId('email-card')).toBeDefined()
  })
})
