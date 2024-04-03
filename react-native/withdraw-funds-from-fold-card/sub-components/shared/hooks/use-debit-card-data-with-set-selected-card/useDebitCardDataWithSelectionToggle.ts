import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { updateSelectedCard } from 'src/screens/withdraw-funds-from-fold-card/redux/withdrawFundsFromFoldCardSlice'
import { selectInstantDebitCards } from 'src/api/ach/achSelectors'
import { InstantDebitCard } from 'src/api/ach/types'

export const useDebitCardDataWithSetSelectedCard = () => {
  const dispatch = useAppDispatch()

  const debitCards = useAppSelector(selectInstantDebitCards)

  const setSelectedCard = (cardDetails: InstantDebitCard) =>
    dispatch(updateSelectedCard(cardDetails))

  return {
    debitCards,
    setSelectedCard
  }
}
