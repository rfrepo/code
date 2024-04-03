import type { ApolloError } from '@apollo/client'

export type ValidationName =
  | 'minChars'
  | 'commonChar'
  | 'capitalChar'
  | 'specialCharOrNum'

export type ValidationResults = {
  [key in ValidationName]: boolean
}

export type Validators = {
  [key in ValidationName]: (input: string) => boolean
}

type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

export const entries = <T>(obj: T): Entries<T> => Object.entries(obj) as any

export type UseUpdateCustomerPassword = {
  updateInProgress: boolean
  errorUpdatingPassword: ApolloError
  passwordSuccessfullyUpdated: boolean
  updatePassword: (password: string) => void
}
