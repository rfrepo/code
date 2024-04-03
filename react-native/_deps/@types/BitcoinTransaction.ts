import { Currency } from '_deps/@types/Currency'

export interface BitcoinTransaction {
  id: string
  created: Date
  type: BitcoinTransactionType
  asset_amount: string
  asset_currency: Currency
  fiat_amount: string | null
  fiat_currency: Currency.USD | null
  status: BitcoinTransactionStatus
  transaction_id: string | null
  transaction_url: string | null
  extra_spin_count: Number
  destination_address: string | null
  fees: FeeType[] | null
  exchange_rate: string
  fiat_amount_excluding_fees: string | null
  asset_amount_excluding_fees: string | null
}

export enum BitcoinTransactionType {
  Purchase = <any>'trade',
  Withdrawal = <any>'withdrawal'
}

export enum BitcoinTransactionStatus {
  settled = 'settled',
  pending = 'pending'
}

export type FeeType = {
  name: string
  amount: string
  currency: Currency
}
