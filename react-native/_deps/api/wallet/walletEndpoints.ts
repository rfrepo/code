import { foldApi } from '_deps/api/foldApi'
import {
  Balances,
  ParseAddressQRScanPayload,
  ParseAddressQRScanResponse,
  Quote,
  QuotePayload,
  WithdrawConfirmPayload,
  WithdrawConfirmResponse,
  WithdrawEstimateResponse
} from '_deps/api/wallet/types'
import { Builder } from '_deps/api/types'
import { AutoStack } from '_deps/@types/AutoStack'
import { BitcoinSellingEstimate } from '_deps/@types/BitcoinSellingEstimate'
import { RoundUp } from '_deps/@types/RoundUp'

export const WALLET_BALANCES_TAG = 'Balances'

const getBalances = (builder: Builder) =>
  builder.query<Balances, void>({
    query: () => '/wallet/balances',
    providesTags: [WALLET_BALANCES_TAG]
  })

const getQuote = (builder: Builder) =>
  builder.query<Quote, string>({
    query: uuid => `/wallet/quotes/${uuid}`
  })

const createQuote = (builder: Builder) =>
  builder.mutation<Quote, QuotePayload>({
    query: body => ({
      url: '/wallet/quotes',
      method: 'POST',
      body: {
        input_currency: 'USD',
        output_currency: 'BTC',
        transaction_type: 'buy_specify_spend_amount',
        ...body
      }
    })
  })

const executeQuote = (builder: Builder) =>
  builder.mutation<Quote, string>({
    query: uuid => ({
      url: `/wallet/quotes/${uuid}/execute`,
      method: 'POST'
    }),
    invalidatesTags: [
      WALLET_BALANCES_TAG,
      'foldCard',
      'Transactions',
      'Profile'
    ]
  })

const getAutoStack = (builder: Builder) =>
  builder.query<AutoStack, string>({
    query: () => `/wallet/auto_stack`
  })

const deleteAutoStack = (builder: Builder) =>
  builder.mutation<any, any>({
    query: () => ({
      url: `/wallet/auto_stack`,
      method: 'PUT',
      body: { is_deleted: true }
    })
  })

const parseAddressQRScan = (builder: Builder) =>
  builder.mutation<ParseAddressQRScanResponse, ParseAddressQRScanPayload>({
    query: ({ ...rest }) => ({
      url: '/parse_bitcoin_qr',
      method: 'POST',
      body: {
        ...rest
      }
    })
  })

const withdrawCreateEstimate = (builder: Builder) =>
  builder.query<WithdrawEstimateResponse, void>({
    query: () => ({
      url: '/wallet/withdraw/estimate',
      method: 'POST',
      body: {
        withdraw_all: true,
        currency: 'BTC'
      }
    })
  })

const withdrawConfirm = (builder: Builder) =>
  builder.mutation<WithdrawConfirmResponse, WithdrawConfirmPayload>({
    query: ({ token, ...rest }) => ({
      url: '/wallet/withdraw',
      method: 'POST',
      headers: {
        'FOLD-2FA-TOKEN': token
      },
      body: {
        withdraw_all: true,
        currency: 'BTC',
        ...rest
      }
    }),
    invalidatesTags: [WALLET_BALANCES_TAG, 'Transactions', 'Profile']
  })

const getEstimatedSaleOfBitcoinToUSD = (builder: Builder) =>
  builder.query<BitcoinSellingEstimate, null>({
    query: amount => ({
      method: 'GET',
      url: `/wallet/bitcoin_selling_estimate?amount=${amount}`
    })
  })

const refetchDashboardData = (builder: Builder) =>
  builder.query<void, void>({
    queryFn: async (_, { dispatch }) => {
      await Promise.all([
        dispatch(
          foldApi.endpoints.getConfig.initiate(undefined, {
            forceRefetch: true
          })
        ),
        dispatch(
          foldApi.endpoints.getProfile.initiate(undefined, {
            forceRefetch: true
          })
        ),
        dispatch(
          foldApi.endpoints.getBalances.initiate(undefined, {
            forceRefetch: true
          })
        ),
        dispatch(
          foldApi.endpoints.getExchangeRates.initiate(undefined, {
            forceRefetch: true
          })
        ),
        dispatch(
          foldApi.endpoints.getTransactions.initiate(
            { limit: 4 },
            { forceRefetch: true }
          )
        ),
        dispatch(
          foldApi.endpoints.getAutoStack.initiate(undefined, {
            forceRefetch: true
          })
        ),
        dispatch(
          foldApi.endpoints.getRoundUp.initiate(undefined, {
            forceRefetch: true
          })
        ),
        dispatch(
          foldApi.endpoints.getRoundUpConfig.initiate(undefined, {
            forceRefetch: true
          })
        )
      ])

      return { data: null }
    }
  })

const pushToCardCreateQuote = (builder: Builder) =>
  builder.mutation<Quote, QuotePayload>({
    query: body => ({
      url: '/wallet/quotes',
      method: 'POST',
      body: {
        transaction_type: 'sell_specify_spend_amount_market',
        input_currency: 'BTC',
        output_currency: 'USD',
        async_processing: true,
        ...body
      }
    })
  })

const getRoundUp = (builder: Builder) =>
  builder.query<RoundUp, any>({
    query: () => ({
      url: '/wallet/round_up',
      method: 'GET'
    })
  })

const updateRoundUp = (builder: Builder) =>
  builder.mutation<RoundUp, RoundUp>({
    query: body => ({
      url: '/wallet/round_up',
      method: 'PUT',
      body: {
        ...body
      }
    })
  })

const getRoundUpConfig = (builder: Builder) =>
  builder.query<RoundUp, any>({
    query: () => ({
      url: '/wallet/round_up/config',
      method: 'GET'
    })
  })

export const walletEndpoints = foldApi
  .enhanceEndpoints({
    addTagTypes: [WALLET_BALANCES_TAG]
  })
  .injectEndpoints({
    endpoints: builder => ({
      getQuote: getQuote(builder),
      getAutoStack: getAutoStack(builder),
      createQuote: createQuote(builder),
      pushToCardCreateQuote: pushToCardCreateQuote(builder),
      getBalances: getBalances(builder),
      executeQuote: executeQuote(builder),
      parseAddressQRScan: parseAddressQRScan(builder),
      withdrawConfirm: withdrawConfirm(builder),
      refetchDashboardData: refetchDashboardData(builder),
      withdrawCreateEstimate: withdrawCreateEstimate(builder),
      deleteAutoStack: deleteAutoStack(builder),
      getEstimatedSaleOfBitcoinToUSD: getEstimatedSaleOfBitcoinToUSD(builder),
      getRoundUp: getRoundUp(builder),
      updateRoundUp: updateRoundUp(builder),
      getRoundUpConfig: getRoundUpConfig(builder)
    }),
    overrideExisting: false
  })

export const {
  useGetBalancesQuery,
  useGetAutoStackQuery,
  useCreateQuoteMutation,
  usePushToCardCreateQuoteMutation,
  useExecuteQuoteMutation,
  useParseAddressQRScanMutation,
  useWithdrawConfirmMutation,
  useWithdrawCreateEstimateQuery,
  useLazyRefetchDashboardDataQuery,
  useDeleteAutoStackMutation,
  useLazyGetEstimatedSaleOfBitcoinToUSDQuery,
  useLazyGetRoundUpQuery,
  useUpdateRoundUpMutation,
  useLazyGetRoundUpConfigQuery
} = walletEndpoints
