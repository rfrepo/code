import { RootState } from 'src/redux/store'
import { InstantDebitCard } from 'src/api/ach/types'

export const selectDestinationCard = (state: RootState): InstantDebitCard =>
  state.withdrawFundsFromFoldCard.selectedCard

export const selectWithdrawalAmount = (state: RootState): string =>
  state.withdrawFundsFromFoldCard.withdrawalAmount

export const selectRefererRoute = (state: RootState): string =>
  state.withdrawFundsFromFoldCard.refererRoute
