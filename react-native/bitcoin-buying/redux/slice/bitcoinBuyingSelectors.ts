import { RootState } from '_deps/redux/store'

export const selectRecipientAddress = (state: RootState) =>
  state.bitcoinBuying.recipientAddress

export const selectPurchaseAmount = (state: RootState) =>
  state.bitcoinBuying.purchaseAmount
