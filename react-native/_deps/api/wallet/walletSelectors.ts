import { foldApi } from '_deps/api/foldApi'
import { createSelector } from '@reduxjs/toolkit'
import { Balances } from '_deps/api/wallet/types'

const selectBalancesResult = foldApi.endpoints.getBalances?.select()

const selectAutoStackResult = foldApi.endpoints.getAutoStack?.select()

export const selectBalances = createSelector(
  selectBalancesResult,
  ({ data: balances = {} }) => balances.BTC || {}
)

export const selectAvailableBalance = createSelector(
  selectBalances,
  ({ available = '0' }: Balances) => available
)

export const selectPendingPurchasesBalance = createSelector(
  selectBalances,
  ({ pending_purchases = '0' }: Balances) => pending_purchases
)

export const selectPendingWithdrawalBalance = createSelector(
  selectBalances,
  ({ pending_withdrawals = '0' }: Balances) => pending_withdrawals
)

export const selectBalanceDataWithBooleans = createSelector(
  selectAvailableBalance,
  selectPendingPurchasesBalance,
  selectPendingWithdrawalBalance,
  (
    availableBalance: string,
    pendingPurchasesBalance: string,
    pendingWithdrawalBalance: string
  ) => ({
    availableBalance,
    pendingPurchasesBalance,
    pendingWithdrawalBalance,
    hasAvailableBalance: !!Number(availableBalance),
    hasPendingPurchasesBalance: !!Number(pendingPurchasesBalance),
    hasPendingWithdrawalBalance: !!Number(pendingWithdrawalBalance)
  })
)

export const selectPendingTransactionsCount = createSelector(
  selectBalances,
  ({ pending_transactions_count = 0 }: Balances) => pending_transactions_count
)

export const selectAutoStack = createSelector(
  selectAutoStackResult,
  ({ data }) => data
)

export const selectHasAutoStack = createSelector(
  selectAutoStack,
  (autoStack = {}) => !!Object.keys(autoStack).length
)
