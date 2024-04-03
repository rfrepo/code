import React from 'react'
import { InlineErrorToast } from 'src/shared/components/inline-error-toast/InlineErrorToast'
import { useTransferAmountValidation } from 'src/screens/withdraw-funds-from-fold-card/sub-components/initiate-withdrawal/hooks/use-transfer-amount-validation/useTransferAmountValidation'

type Props = {
  amount: string
}

export const ErrorToast = ({ amount }: Props) => {
  const { error, clearError } = useTransferAmountValidation(amount)

  return <InlineErrorToast error={error} onClose={clearError} />
}
