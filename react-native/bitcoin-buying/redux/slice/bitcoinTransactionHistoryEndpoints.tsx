import { foldApi } from '_deps/api/foldApi'
import { BitcoinTransaction } from '_deps/@types/BitcoinTransaction'

export interface TransactionHistoryPagination {
  additional_pages: boolean
  transactions: BitcoinTransaction[]
}

export const WALLET_TRANSACTIONS_TAG = 'Transactions'

export const bitcoinTransactionHistoryEndpoints = foldApi
  .enhanceEndpoints({ addTagTypes: [WALLET_TRANSACTIONS_TAG] })
  .injectEndpoints({
    endpoints: builder => ({
      getTransactions: builder.query<
        TransactionHistoryPagination,
        { limit?: number; page?: number }
      >({
        query: ({ limit, page }) => ({
          url: `/wallet/transactions?page=${page ?? 0}&limit=${limit ?? 25}`,
          method: 'GET'
        }),
        providesTags: [WALLET_TRANSACTIONS_TAG]
      }),
      getPendingTransactions: builder.query<TransactionHistoryPagination, void>(
        {
          query: () => ({
            url: '/wallet/transactions?status=pending',
            method: 'GET'
          }),
          providesTags: [WALLET_TRANSACTIONS_TAG]
        }
      ),
      getCompletedTransactions: builder.query<
        TransactionHistoryPagination,
        void
      >({
        query: ({ ...rest }) => ({
          url: `/wallet/transactions?status=settled&page=${
            rest.page ?? 0
          }&limit=${rest.limit ?? 25}`,
          method: 'GET'
        }),
        providesTags: [WALLET_TRANSACTIONS_TAG]
      })
    }),
    overrideExisting: true
  })

export const {
  useLazyGetTransactionsQuery,
  useGetTransactionsQuery,
  useLazyGetPendingTransactionsQuery,
  useLazyGetCompletedTransactionsQuery
} = bitcoinTransactionHistoryEndpoints
