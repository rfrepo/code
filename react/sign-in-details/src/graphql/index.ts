import { gql } from '@apollo/client'

export const SEND_VERIFICATION_EMAIL = gql`
  mutation SendVerificationEmail {
    sendVerificationEmail {
      status
    }
  }
`

export const UPDATE_EMAIL = gql`
  mutation updateCustomerEmail($input: UpdateEmailAddressInput) {
    updateCustomerEmail(input: $input) {
      emailAddress
    }
  }
`

export const UPDATE_PASSWORD = gql`
  mutation updateCustomerPassword($input: UpdatePasswordInput) {
    updateCustomerPassword(input: $input) {
      userId
    }
  }
`
