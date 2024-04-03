import { RootState } from '_deps/redux/store'

export const selectMySpinSquad = (state: RootState) => state.mySpinSquad

export const selectTotalSatsEarned = (state: RootState) =>
  state.mySpinSquad?.meta?.total_btc_earned

export const selectReferredCardHolderCount = (state: RootState) =>
  state.mySpinSquad?.meta?.referred_cardholder_count
