import { useAppSelector } from 'src/redux/hooks'
import { selectFoldCardBalance } from 'src/redux/global-slices/foldCard/foldCardSelectors'
import { useEffect, useState } from 'react'
import { convertStringToUSD } from 'src/shared/helpers/fiat/convert-string-to-usd/convertStringToUSD'

export const useTransferAmountValidation = (amount: string) => {
  const [error, setError] = useState<null | {}>(null)

  const balance = useAppSelector(selectFoldCardBalance)

  useEffect(() => {
    if (Number(amount)) return

    const amountAsNumber = Number(amount.replace(/[^0-9.]/g, ''))

    if (amountAsNumber && amountAsNumber < 0.25) {
      setError({ message: 'Minimum withdrawal amount is $0.25' })
    } else if (amountAsNumber > balance) {
      setError({
        message: `You only have ${convertStringToUSD(balance)} to transfer`
      })
    } else if (error) setError(null)
  }, [amount])

  return {
    error,
    clearError: () => setError(null)
  }
}
