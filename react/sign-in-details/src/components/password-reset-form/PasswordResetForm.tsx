import type { FormEvent } from 'react'
import {
  ErrorMessage,
  FormContainer,
  SuccessMessage,
  TextInputWrapper,
  InputIconsWrapper,
  errorExceededChars
} from 'components/password-reset-form/styled'
import { CardHeading } from 'components/email-card-and-form/styled'
import { FormSection, Input, UpdateButton } from 'styled'
import React, { useEffect, useRef, useState } from 'react'
import { reportSignInDetailsUpdate } from '@dunelm/tooling/integrations'
import {
  usePasswordValidation,
  validatePasswordLength
} from 'components/password-reset-form/hooks/use-password-validation/usePasswordValidation'
import { UpdatedSignInDetailType } from '@dunelm/tooling/integrations/enums/MyAccount'
import { CapsLockIndicator } from 'components/password-reset-form/caps-lock-indicator/CapsLockIndicator'
import { ValidationCheckList } from 'components/password-reset-form/validation-check-list/ValidationCheckList'
import useUpdateCustomerPassword from 'components/password-reset-form/hooks/use-update-customer-password/useUpdateCustomerPassword'
import { PasswordObfuscationToggle } from 'components/password-reset-form/password-obfuscation-toggle/PasswordObfuscationToggle'

const buttonAttrs = {
  size: 'md',
  type: 'button',
  buttonStyle: 'primary',
  typeAttribute: 'submit',
  dataTestId: 'password-update-button'
}

const passwordInputAttrs = {
  type: 'password',
  name: 'password',
  autoComplete: 'new-password',
  uniqueInputId: 'signInPasswordInput',
  dataTestId: 'sign-in-password-input',
  labelText: 'Enter Your New Password'
}

const PasswordResetForm = () => {
  const input = useRef()

  const {
    updatePassword,
    updateInProgress,
    errorUpdatingPassword,
    passwordSuccessfullyUpdated
  } = useUpdateCustomerPassword()

  const passwordValue = useRef('')

  const [errorPasswordInput, setErrorPasswordInput] = useState(false)

  const { validatePassword, validationResults } = usePasswordValidation()

  const isUpdatedButtonDisabled =
    updateInProgress ||
    !Object.values(validationResults).every(Boolean) ||
    errorPasswordInput

  const checkInputLength = (value: string): void => {
    const isPasswordValid = validatePasswordLength(value)

    setErrorPasswordInput(isPasswordValid)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    updatePassword(passwordValue.current)
  }

  const onChange = (evt: FormEvent<HTMLInputElement>): void => {
    validatePassword(evt.currentTarget.value)

    passwordValue.current = evt.currentTarget.value

    checkInputLength(passwordValue.current)
  }

  useEffect(() => {
    if (!errorUpdatingPassword && !passwordSuccessfullyUpdated) {
      return
    }

    reportSignInDetailsUpdate(
      UpdatedSignInDetailType.Password,
      errorUpdatingPassword?.message
    )
  }, [errorUpdatingPassword, passwordSuccessfullyUpdated])

  return (
    <FormSection onSubmit={onSubmit}>
      <CardHeading>Your Password</CardHeading>
      Update your password regularly so your account stays secure.

      <FormContainer data-testid="my-account-update-password-form">
        <TextInputWrapper>
          <Input
            ref={input}
            onChange={onChange}
            {...passwordInputAttrs}
            value={passwordValue.current}
          />

          <InputIconsWrapper>
            <CapsLockIndicator target={input.current} />

            <PasswordObfuscationToggle target={input.current} />
          </InputIconsWrapper>
        </TextInputWrapper>

        {errorPasswordInput && errorExceededChars}

        {errorUpdatingPassword && ErrorMessage}

        <ValidationCheckList {...validationResults} />

        <UpdateButton {...buttonAttrs}>Update My Password</UpdateButton>

        {passwordSuccessfullyUpdated && SuccessMessage}
      </FormContainer>
    </FormSection>
  )
}

export default PasswordResetForm
