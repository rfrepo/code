import React from 'react'
import { EditIcon } from '@dunelm/core/iconography'
import { EditButton } from 'components/email-card-and-form/styled'

type Props = {
  email: string
  enterEditMode: () => void
}
export const EmailCard = ({ email, enterEditMode }: Props) => (
  <>
    <span data-dd-privacy="mask">{email}</span>

    <EditButton
      onClick={enterEditMode}
      data-testid="email-edit-button"
      id="myAccountSignInDetails-emailAddress-edit"
    >
      <EditIcon />
    </EditButton>
  </>
)
