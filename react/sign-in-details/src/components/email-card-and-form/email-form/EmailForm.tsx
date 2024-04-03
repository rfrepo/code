import * as Yup from 'yup'
import { useFormik } from 'formik'
import type { FormEvent } from 'react'
import {
  reportValidationError,
  reportSignInDetailsUpdate
} from '@dunelm/tooling/integrations'
import React, { useEffect } from 'react'
import {
  EmailInput,
  CancelButton,
  FormContainer,
  TextInputWrapper,
  UpdateEmailButton,
  EmailActionsWrapper
} from 'components/email-card-and-form/styled'
import { emailValidation } from '@dunelm/my-account/src/helpers/formInputs'
import { UpdatedSignInDetailType } from '@dunelm/tooling/integrations/enums/MyAccount'
import { ErrorMessage } from 'components/email-card-and-form/email-form/error-message/ErrorMessage'
import useUpdateCustomerEmail from 'components/email-card-and-form/hooks/use-update-customer-email/useUpdateCustomerEmail'

const createFormikConfig = (email, onSubmit) => ({
  onSubmit,
  initialValues: {
    email
  },
  validationSchema: Yup.object().shape(emailValidation)
})

export const EmailForm = ({
  email,
  onCancel,
  onUpdateSuccess
}: {
  email: string
  onUpdateSuccess: (updatedEmail: string) => void
  onCancel: (event: MouseEvent | FormEvent) => void
}) => {
  const { handleEmailUpdate, mutationLoading, mutationError, mutationSuccess } =
    useUpdateCustomerEmail()

  const {
    values,
    handleBlur,
    handleSubmit,
    handleChange,
    errors: formErrors
  } = useFormik(createFormikConfig(email, handleEmailUpdate))

  useEffect(() => {
    if (mutationSuccess) {
      onUpdateSuccess(values.email)

      reportSignInDetailsUpdate(UpdatedSignInDetailType.Email)
    }

    if (mutationError) {
      reportSignInDetailsUpdate(
        UpdatedSignInDetailType.Email,
        mutationError.message
      )
    }
  }, [mutationSuccess, mutationError])

  const onBlur = (event, error) => {
    handleBlur(event)

    if (error) {
      reportValidationError(error)
    }
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    handleSubmit()
  }

  const isUpdatedButtonDisabled =
    mutationLoading ||
    values.email === email ||
    Boolean(formErrors?.email?.length)

  return (
    <>
      <span>Use an address you’ll always have access to.</span>

      <FormContainer
        onSubmit={onSubmit}
        data-testid="my-account-update-email-form"
      >
        <TextInputWrapper key="email address">
          <EmailInput
            name="email"
            autoComplete="off"
            value={values.email}
            onChange={handleChange}
            uniqueInputId="emailAddress"
            labelText="Your Email Address"
            data-testid="sign-in-email-input"
            infoText={formErrors?.email as string}
            onBlur={e => onBlur(e, formErrors?.email)}
            status={formErrors?.email ? 'error' : null}
          />
        </TextInputWrapper>

        {mutationError && ErrorMessage}

        <EmailActionsWrapper>
          <UpdateEmailButton
            size="md"
            type="button"
            buttonStyle="primary"
            typeAttribute="submit"
            isLoading={mutationLoading}
            data-testid="email-update-button"
            isDisabled={isUpdatedButtonDisabled}
            id="myAccountSignInDetails--emailAddress--update"
          >
            Update My Email Address
          </UpdateEmailButton>

          <CancelButton
            size="md"
            onClick={onCancel}
            typeAttribute="button"
            buttonStyle="secondary"
            data-testid="email-cancel-button"
            id="myAccountSignInDetails--emailAddress--cancel"
          >
            Cancel
          </CancelButton>
        </EmailActionsWrapper>
      </FormContainer>
    </>
  )
}
