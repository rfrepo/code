import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { ValidationName } from 'components/password-reset-form/types'
import { usePasswordValidation } from 'components/password-reset-form/hooks/use-password-validation/usePasswordValidation'

type RenderHookProps = {
  validInput: string
  invalidInput?: string
  validationName: ValidationName
}
describe('usePasswordValidation', () => {
  const renderHookAndAssertValidationRuleState = async ({
    validInput,
    validationName,
    invalidInput = 'password'
  }: RenderHookProps) => {
    const { result } = renderHook(() => usePasswordValidation())

    act(() => {
      result.current.validatePassword(invalidInput)
    })

    expect(result.current.validationResults[validationName]).toBe(false)

    act(() => {
      result.current.validatePassword(validInput)
    })

    return expect(result.current.validationResults[validationName]).toBe(true)
  }

  it('should validate minimum characters rule', async () => {
    await renderHookAndAssertValidationRuleState({
      invalidInput: 'pass',
      validInput: 'password',
      validationName: 'minChars'
    })
  })

  it('should validate common character presence rule', async () => {
    await renderHookAndAssertValidationRuleState({
      validInput: 'password',
      invalidInput: '12345678',
      validationName: 'commonChar'
    })
  })

  it('should validate capital character presence rule', async () => {
    await renderHookAndAssertValidationRuleState({
      validInput: 'Password',
      invalidInput: 'password',
      validationName: 'capitalChar'
    })
  })

  it('should validate special character or number presence rule', async () => {
    await renderHookAndAssertValidationRuleState({
      validInput: 'Password@123',
      validationName: 'specialCharOrNum'
    })
  })
})
