export enum ParseAddressErrorCode {
  lightning = 'lightning',
  generic = 'generic',
  invalid = 'invalid'
}

export interface ErrorInfo {
  code: ParseAddressErrorCode
  message: string
}

export interface Error {
  status: number
  data: ErrorInfo
}

export interface ParseAddressResponse {
  address: string | null
  amount: number | null
  label: string | null
  lightning: string | null
  message: string | null
  code: string | null
}

export const errorMap = {
  lightning: {
    message: 'This is a lightning invoice not a Bitcoin address'
  },
  invalid: {
    message: 'This is not a valid Bitcoin address'
  },
  generic: {
    message: 'Something went wrong. Please try again'
  }
}
