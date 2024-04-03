import { useState } from 'react'
import { UPDATE_PASSWORD } from 'graphql'
import { useMutation } from '@apollo/client'
import { UseUpdateCustomerPassword } from 'components/password-reset-form/types'

const useUpdateCustomerPassword = (): UseUpdateCustomerPassword => {
  const [passwordSuccessfullyUpdated, setPasswordSuccessfullyUpdated] =
    useState(false)

  const [update, { loading: updateInProgress, error: errorUpdatingPassword }] =
    useMutation(UPDATE_PASSWORD)

  const updatePassword = async (password: string) => {
    setPasswordSuccessfullyUpdated(false)

    await update({
      variables: {
        input: {
          password
        }
      }
    })

    setPasswordSuccessfullyUpdated(true)
  }

  return {
    updatePassword,
    updateInProgress,
    errorUpdatingPassword,
    passwordSuccessfullyUpdated
  }
}

export default useUpdateCustomerPassword
