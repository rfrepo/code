import { FormSection } from 'styled'
import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { CardHeading } from 'components/email-card-and-form/styled'
import { SuccessMessage } from 'components/password-reset-form/styled'
import { EmailForm } from 'components/email-card-and-form/email-form/EmailForm'
import { EmailCard } from 'components/email-card-and-form/email-card/EmailCard'

export const EmailCardAndForm = () => {
  const { user, user: { email } = {} } = useAuth0()

  const enterEditMode = () => setIsInEditMode(true)

  const [isInEditMode, setIsInEditMode] = useState<boolean>()

  const [successMsgVisibility, setSuccessMsgVisibility] = useState<boolean>()

  const cancelEditMode = () => {
    setIsInEditMode(false)

    setSuccessMsgVisibility(false)
  }

  const onUpdateSuccess = (updatedEmail: string) => {
    setIsInEditMode(false)

    user.email = updatedEmail

    setSuccessMsgVisibility(true)
  }

  const Form = (
    <EmailForm
      {...{
        email,
        onUpdateSuccess,
        onCancel: cancelEditMode
      }}
    />
  )

  const Card = (
    <>
      <EmailCard {...{ enterEditMode, email }} />

      {successMsgVisibility && SuccessMessage}
    </>
  )

  return (
    <FormSection>
      <CardHeading>Your Email Address</CardHeading>

      {isInEditMode ? Form : Card}
    </FormSection>
  )
}
