import { createSlice } from '@reduxjs/toolkit'

export interface BitcoinBuyingState {
  isFirstTimeBuyer: null
  purchaseAmount: number | null
  recipientAddress: string | null
}

const initialState: BitcoinBuyingState = {
  purchaseAmount: null,
  recipientAddress: null,
  isFirstTimeBuyer: null
} as BitcoinBuyingState

const bitcoinBuyingSlice = createSlice({
  reducers: {
    updatePurchaseAmount: (state: BitcoinBuyingState, action) => {
      state.purchaseAmount = action.payload
    },
    updateRecipientAddress: (state: BitcoinBuyingState, action) => {
      state.recipientAddress = action.payload
    },
    updateIsFirstTimeBuyer: (state: BitcoinBuyingState, action) => {
      state.isFirstTimeBuyer = action.payload
    }
  },
  initialState,
  name: 'bitcoinBuying'
})

export const {
  updatePurchaseAmount,
  updateIsFirstTimeBuyer,
  updateRecipientAddress
} = bitcoinBuyingSlice.actions

export default bitcoinBuyingSlice.reducer
