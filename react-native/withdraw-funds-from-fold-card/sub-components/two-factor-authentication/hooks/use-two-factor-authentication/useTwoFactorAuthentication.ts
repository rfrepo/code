import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { useCallback, useEffect } from 'react'
import {
  useCreate2FACodeMutation,
  useVerify2FACodeMutation
} from 'src/api/twoFactorAuthentication/twoFactorAuthenticationEndpoints'
import { useGetProfileQuery } from 'src/api/profile/profileEndpoints'
import { select2FAConfiguration } from 'src/redux/global-slices/two-factor-authentication/twoFactorAuthenticationV2Selectors'
import { set2FAVerificationResult } from 'src/redux/global-slices/two-factor-authentication/twoFactorAuthenticationV2Slice'

export const useTwoFactorAuthentication = () => {
  const dispatch = useAppDispatch()

  const [verify2FACode, { error, reset, isLoading, isFetching, data }] =
    useVerify2FACodeMutation()

  const { scope } = useAppSelector(select2FAConfiguration)

  const { refetch: refetchProfile } = useGetProfileQuery()

  const [send2FACodeToTheUser] = useCreate2FACodeMutation()

  useEffect(() => {
    refetchProfile()

    send2FACodeToTheUser()

    return () => reset()
  }, [])

  const verifyCode = async (code: string) => {
    const result = await verify2FACode({
      code,
      scope
    })

    dispatch(set2FAVerificationResult(result))
  }

  return {
    clearError:reset,
    isVerified: data,
    verificationError: error?.data,
    isVerifyingCode: isFetching || isLoading,
    verifyCode: useCallback(verifyCode, [scope])
  }
}
