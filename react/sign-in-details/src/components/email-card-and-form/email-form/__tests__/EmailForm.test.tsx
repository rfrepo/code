import React from 'react'
import {
  reportSignInDetailsUpdate,
  reportValidationError
} from '@dunelm/tooling/integrations'
import { EmailForm } from '../EmailForm'
import {
  EmailInput,
  FormContainer,
  UpdateEmailButton
} from 'components/email-card-and-form/styled'
import { FormikConfig, useFormik } from 'formik'
import { render, waitFor } from '@testing-library/react'
import useUpdateCustomerEmail from 'components/email-card-and-form/hooks/use-update-customer-email/useUpdateCustomerEmail'

jest.mock('formik', () => ({
  useFormik: jest.fn().mockReturnValue({
    values: {},
    errors: {},
    handleBlur: jest.fn(),
    handleSubmit: jest.fn(),
    handleChange: jest.fn()
  })
}))

jest.mock('@dunelm/tooling/integrations', () => ({
  reportValidationError: jest.fn(),
  reportSignInDetailsUpdate: jest.fn()
}))

jest.mock('components/email-card-and-form/styled', () => ({
  ...jest.requireActual('components/email-card-and-form/styled'),
  FormContainer: jest
    .fn()
    .mockImplementation(({ children, ...rest }) => (
      <div {...rest}>{children}</div>
    )),
  UpdateEmailButton: jest
    .fn()
    .mockImplementation(
      ({
        children,
        buttonStyle,
        typeAttribute,
        isLoading,
        isDisabled,
        ...rest
      }) => <button {...rest}>{children}</button>
    ),
  EmailInput: jest
    .fn()
    .mockImplementation(({ uniqueInputId, labelText, infoText, ...rest }) => (
      <input {...rest} />
    ))
}))

jest.mock('@dunelm/my-account/src/helpers/formInputs', () => ({
  emailValidation: {}
}))

jest.mock(
  'components/email-card-and-form/hooks/use-update-customer-email/useUpdateCustomerEmail',
  () =>
    jest.fn().mockReturnValue({
      mutationLoading: false,
      mutationSuccess: false,
      mutationError: undefined,
      handleEmailUpdate: jest.fn()
    })
)

describe('EmailForm', () => {
  let renderResult: ReturnType<typeof render>

  let onCancel: jest.Mock

  let onUpdateSuccess: jest.Mock

  beforeEach(() => {
    onCancel = jest.fn()

    onUpdateSuccess = jest.fn()

    renderResult = render(
      <EmailForm
        onCancel={onCancel}
        email="email@domain.com"
        onUpdateSuccess={onUpdateSuccess}
      />
    )
  })

  const rerender = () => {
    const { rerender } = renderResult

    rerender(
      <EmailForm
        onCancel={onCancel}
        email="email@domain.com"
        onUpdateSuccess={onUpdateSuccess}
      />
    )
  }

  it('should render input and buttons', async () => {
    const { getByText, getByTestId } = renderResult

    await waitFor(() => {
      expect(
        getByText(/Use an address you’ll always have access to./)
      ).toBeDefined()

      expect(getByTestId('sign-in-email-input')).toBeDefined()

      expect(getByTestId('email-update-button')).toBeDefined()

      expect(getByTestId('email-cancel-button')).toBeDefined()
    })
  })

  it('should call onCancel when cancel button is clicked', async () => {
    const { getByTestId } = renderResult

    await waitFor(() => {
      getByTestId('email-cancel-button').click()

      expect(onCancel).toHaveBeenCalled()
    })
  })

  it('should call onUpdateSuccess and send tracking when email is updated', async () => {
    const useUpdateCustomerEmailMock = useUpdateCustomerEmail as jest.Mock

    useUpdateCustomerEmailMock.mockReturnValue({
      mutationSuccess: true
    })

    const { getByTestId } = renderResult

    rerender()

    getByTestId('email-update-button').click()

    await waitFor(() => {
      expect(onUpdateSuccess).toHaveBeenCalled()

      expect(reportSignInDetailsUpdate).toHaveBeenCalledWith('Email')
    })
  })

  it('should report update email error', async () => {
    const useUpdateCustomerEmailMock = useUpdateCustomerEmail as jest.Mock

    useUpdateCustomerEmailMock.mockReturnValue({
      mutationError: { message: 'error' }
    })

    onUpdateSuccess.mockClear()

    const { getByTestId } = renderResult

    rerender()

    getByTestId('email-update-button').click()

    await waitFor(() => {
      expect(onUpdateSuccess).not.toHaveBeenCalled()

      expect(reportSignInDetailsUpdate).toHaveBeenCalledWith('Email', 'error')
    })
  })

  it('should call formik submit', async () => {
    const formSubmit = (FormContainer as unknown as jest.Mock).mock.calls[0][0]
      .onSubmit

    const formEvent = {
      preventDefault: jest.fn()
    } as unknown as React.FormEvent<HTMLFormElement>

    formSubmit(formEvent)

    const formikSubmit = useFormik({} as FormikConfig<any>).handleSubmit

    expect(formikSubmit).toHaveBeenCalled()

    expect(formEvent.preventDefault).toHaveBeenCalled()
  })

  it('should call formik blur and report error', () => {
    const useFormikMock = useFormik as unknown as jest.Mock

    useFormikMock.mockReturnValue({
      values: {},
      handleBlur: jest.fn(),
      errors: { email: 'error' }
    })

    const EmailInputMock = EmailInput as unknown as jest.Mock

    EmailInputMock.mockClear()

    rerender()

    const formBlur = EmailInputMock.mock.calls[0][0].onBlur

    formBlur({ target: { value: 'value' } })

    const mockFormikHookResults = useFormik({} as FormikConfig<any>)

    expect(mockFormikHookResults.handleBlur).toHaveBeenCalled()

    expect(reportValidationError).toHaveBeenCalledWith('error')
  })

  describe('updateEmailButton disabled state', () => {
    const rerenderAndExpectUpdateEmailButtonToBeDisabled = () => {
      const UpdateEmailButtonMock = UpdateEmailButton as unknown as jest.Mock

      UpdateEmailButtonMock.mockClear()

      rerender()

      expect(UpdateEmailButtonMock.mock.calls[0][0].isDisabled).toBe(true)
    }

    it('should be disabled when update is in progress', () => {
      const useUpdateCustomerEmailMock = useUpdateCustomerEmail as jest.Mock

      useUpdateCustomerEmailMock.mockReturnValue({
        mutationLoading: true
      })

      rerenderAndExpectUpdateEmailButtonToBeDisabled()
    })

    it('should be disabled when email has not been edited', () => {
      const useFormikMock = useFormik as unknown as jest.Mock

      useFormikMock.mockReturnValue({
        values: { email: 'email@example.com' }
      })

      rerenderAndExpectUpdateEmailButtonToBeDisabled()
    })

    it('should be disabled when email is invalid', () => {
      const useFormikMock = useFormik as unknown as jest.Mock

      useFormikMock.mockReturnValue({
        values: {},
        onChange: jest.fn(),
        errors: { email: 'email invalid' }
      })

      rerenderAndExpectUpdateEmailButtonToBeDisabled()
    })
  })
})
