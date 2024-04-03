import {
  useInitializeAstraMutation,
  useLazyGetACHAccountsDetailsQuery
} from 'src/api/ach/achEndpoints'
import { useEffect, useState } from 'react'
import { StackActions, useNavigation } from '@react-navigation/native'

export const useInitializeAstra = () => {
  const navigator = useNavigation()

  const [initializeAstra, { error, isLoading, data }] =
    useInitializeAstraMutation()

  const [errorMessage, setErrorMessage] = useState(null)

  const [getACHAccountsDetails] = useLazyGetACHAccountsDetailsQuery()

  useEffect(() => {
    if (data) {
      if (data.status === 'verified') {
        getACHAccountsDetails()

        navigator.dispatch(
          StackActions.replace('AstraAuthorisation', {
            onSuccessfulAuthenticationRedirectTo: 'WithdrawalCardManagement'
          })
        )
      } else {
        setErrorMessage(
          "Sorry, this feature is unavailable to you at this time. We will message you when it's available again. In the meantime please utilize one of our other funding mechanisms."
        )
      }
    }
  }, [data])

  useEffect(() => {
    if (error) {
      setErrorMessage('Please try again later.')
    }
  }, [error])

  return { errorMessage, setErrorMessage, isLoading, initializeAstra }
}
