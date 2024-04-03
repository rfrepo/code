import { useCallback, useState } from 'react'

import type {
  ValidationResults,
  Validators
} from 'components/password-reset-form/types'
import { entries } from 'components/password-reset-form/types'

const { test } = RegExp.prototype

const specialCharacters = [' ', '!', '"', '#', '\\$', '%', '&', '\'', '\\(', '\\)', '\\*', '\\+', ',', '-', '\\.', '/', ':', ';', '<', '=', '>', '\\?', '@', '\\[', '\\\\', '\\]', '\\^', '_', '`', '{', '\\|', '}', '~'].join('|') // prettier-ignore

const SEVENTY_THREE_CHARS_REGEX = /.{73,}/

const validators = entries<Validators>({
  minChars: test.bind(/.{8,}/),
  commonChar: test.bind(/[a-z]/),
  capitalChar: test.bind(/[A-Z]/),
  specialCharOrNum: test.bind(new RegExp(`[0-9]|${specialCharacters}`))
})

export const validatePasswordLength = (value: string): boolean =>
  SEVENTY_THREE_CHARS_REGEX.test(value)

const validate = (input = ''): ValidationResults =>
  validators.reduce(
    (resultMap, [validator, operation]): ValidationResults => ({
      ...resultMap,
      [validator]: operation(input)
    }),
    {} as ValidationResults
  )

export const usePasswordValidation = () => {
  const [validationResults, setValidationResults] =
    useState<ValidationResults>(validate())

  const validatePassword = useCallback((input: string) => {
    setValidationResults(validate(input))
  }, [])

  return { validatePassword, validationResults }
}
