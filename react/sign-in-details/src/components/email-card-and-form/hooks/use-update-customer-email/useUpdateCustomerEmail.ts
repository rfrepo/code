import { useState } from 'react'
import { UPDATE_EMAIL } from 'graphql'
import { useMutation } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'

const useUpdateCustomerEmail = () => {
  const { user } = useAuth0()

  const userEmail = user.email || ''

  const [mutationSuccess, setMutationSuccess] = useState(false)

  const [updateEmail, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_EMAIL)

  const handleEmailUpdate = (values: { email: string }) => {
    setMutationSuccess(false)

    const variables = {
      input: {
        emailAddress: values.email
      }
    }

    updateEmail({ variables }).then(() => {
      setMutationSuccess(true)
    })
  }

  return {
    userEmail,
    handleEmailUpdate,
    mutationLoading,
    mutationError,
    mutationSuccess
  }
}

export default useUpdateCustomerEmail
