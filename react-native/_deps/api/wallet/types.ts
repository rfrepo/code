import { FeeType } from '_deps/@types/BitcoinTransaction'
import { Currency } from '_deps/@types/Currency'
import { AutoStackFrequency } from '_deps/@types/AutoStackFrequency'

export interface Fee {
  name: string
  amount: string
  currency: 'USD' | 'BTC'
}

export type Balances = {
  available: string
  pending_purchases: string
  pending_withdrawals: string
  pending_transactions_count: Number
}

export interface Quote {
  id: string
  fees: Fee[]
  status: string
  input_amount: string
  input_currency: 'USD'
  output_amount: string
  exchange_rate: string
  output_currency: 'BTC'
  purchase_amount: string
  expiration_time: string
  transaction_type: string
  provider_created_at: string
  request_new_quote_time: string
  settlement_string: string
  fee_message: string
}

export interface QuotePayload {
  input_amount: string
  input_currency: 'USD'
  output_currency: 'BTC'
  transaction_type: string
  auto_stack_enable: boolean
  frequency: AutoStackFrequency
}

export interface ParseAddressQRScanPayload {
  raw_data: string
}

export interface ParseAddressQRScanResponse {
  data: {
    address: string
    amount: string
    label: string
    message: string
    lightning: string
  }
}

export enum WithdrawConfirmStatus {
  processed = 'processed',
  pendingDisbursement = 'pending_disbursement',
  pendingUserAuth = 'pending_user_authorization'
}

export interface WithdrawConfirmPayload {
  address: string
  withdraw_all: boolean
  currency: Currency.BTC
}

export interface WithdrawEstimateResponse {
  fees: FeeType[]
  total_amount: string
  sending_amount: string
}

export interface WithdrawConfirmResponse {
  fees: FeeType[]
  total_amount: string
  sending_amount: string
  status: WithdrawConfirmStatus
}
