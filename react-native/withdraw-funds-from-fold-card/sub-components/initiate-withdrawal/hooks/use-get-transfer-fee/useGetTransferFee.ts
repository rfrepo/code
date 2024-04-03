import { useLazyGetEstimatedTransferFeeQuery } from 'src/api/ach/achEndpoints'
import { useEffect, useState } from 'react'

export const useGetTransferFee = () => {
  const [amount, setAmount] = useState()

  const [getFee, { data, isFetching: isLoading }] =
    useLazyGetEstimatedTransferFeeQuery()

  useEffect(() => {
    if (!amount) return

    const delayAPIRequest = setTimeout(() => {
      getFee(amount)
    }, 800)

    return () => {
      clearTimeout(delayAPIRequest)
    }
  }, [amount])

  return {
    isLoading,
    getFee: setAmount,
    feeAmount: data?.fee_amount
  }
}
