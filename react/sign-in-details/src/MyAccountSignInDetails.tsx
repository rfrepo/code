import {
  MyAccountWrapper,
  MyAccountPadlockIcon,
  MyAccountDetailsTitle,
  MyAccountDetailsHeader
} from 'styled'
import React from 'react'
import { theme } from '@dunelm/styling/theme'
import { EmailCardAndForm } from 'components/email-card-and-form/EmailCardAndForm'
import PasswordResetForm from 'components/password-reset-form/PasswordResetForm'
import useMyAccountSignInDetailsGAEvent from 'hooks/useMyAccountSignInDetailsGAEvent'

const MyAccountSignInDetails = () => {
  useMyAccountSignInDetailsGAEvent()

  return (
    <MyAccountWrapper data-testid="my-account-sign-in">
      <MyAccountDetailsHeader>
        <MyAccountPadlockIcon fillColor={theme.colors.charcoal} size="md" />

        <MyAccountDetailsTitle>Sign In Details</MyAccountDetailsTitle>
      </MyAccountDetailsHeader>

      <EmailCardAndForm />

      <PasswordResetForm />
    </MyAccountWrapper>
  )
}

export default MyAccountSignInDetails
