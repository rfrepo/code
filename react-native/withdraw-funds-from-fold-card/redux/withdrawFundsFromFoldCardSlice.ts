import { createSlice } from '@reduxjs/toolkit'
import { InstantDebitCard } from 'src/api/ach/types'

export interface WithDrawFundFromFoldCardState {
  refererRoute: string
  withdrawalAmount: number
  selectedCard: InstantDebitCard | null
}

const initialState: WithDrawFundFromFoldCardState = {
  refererRoute: '',
  withdrawalAmount: 0,
  selectedCard: null
} as WithDrawFundFromFoldCardState

const withdrawFundsFromFoldCardSlice = createSlice({
  reducers: {
    updateSelectedCard: (state: WithDrawFundFromFoldCardState, action) => {
      state.selectedCard =
        action.payload.id === state.selectedCard?.id ? null : action.payload
    },
    updateWithdrawalAmount: (state: WithDrawFundFromFoldCardState, action) => {
      state.withdrawalAmount = action.payload
    },
    clearSelectedCard: (state: WithDrawFundFromFoldCardState) => {
      state.selectedCard = null
    },
    setRefererRoute: (state: WithDrawFundFromFoldCardState, action) => {
      state.refererRoute = action.payload
    },
    resetWithdrawFundsFromFoldCardState: () => initialState
  },
  initialState,
  name: 'withdrawFundsFromFoldCard'
})

export const {
  setRefererRoute,
  clearSelectedCard,
  updateSelectedCard,
  updateWithdrawalAmount,
  resetWithdrawFundsFromFoldCardState
} = withdrawFundsFromFoldCardSlice.actions

export default withdrawFundsFromFoldCardSlice.reducer
