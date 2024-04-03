import React, { useState, useEffect } from 'react'
import { ErrorToast } from 'bitcoin-buying/sub-components/_shared-components/error-toast/ErrorToast'
import {
  ErrorInfo,
  ParseAddressResponse
} from 'bitcoin-buying/sub-components/recipient-address/address-qr-scanner/address-scan-error-toast/types'

type Props = {
  error: ParseAddressResponse
}

export const errorMap = {
  lightning: {
    message: 'This is a lightning invoice not a Bitcoin address'
  } as ErrorInfo,
  invalid: {
    message: 'This is not a valid Bitcoin address'
  } as ErrorInfo,
  generic: {
    message: 'Something went wrong. Please try again'
  } as ErrorInfo
}

export const AddressScanErrorToast = ({ error }: Props) => {
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (error?.lightning) {
      setErrorMessage(errorMap.lightning.message)
    } else if (error?.code === 'FOLD-0025') {
      setErrorMessage(errorMap.invalid.message)
    } else {
      setErrorMessage(errorMap.generic.message)
    }
  }, [error])

  return <ErrorToast errorMessage={errorMessage} />
}
