import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { PasswordObfuscationToggle } from 'components/password-reset-form/password-obfuscation-toggle/PasswordObfuscationToggle'

jest.mock('@dunelm/core/iconography', () => ({
  PasswordReveal: jest
    .fn()
    .mockReturnValue(<div data-testid="password-revealed" />),
  PasswordConceal: jest
    .fn()
    .mockReturnValue(<div data-testid="password-concealed" />)
}))

describe('PasswordObfuscationToggle', () => {
  let target: HTMLInputElement

  let renderResult: ReturnType<typeof render>

  beforeEach(() => {
    target = {
      setAttribute: jest.fn()
    } as unknown as HTMLInputElement

    renderResult = render(<PasswordObfuscationToggle target={target} />)
  })

  it('should render the password concealed state as the default state', async () => {
    const { getByTestId } = renderResult

    await waitFor(() => {
      expect(getByTestId('password-concealed')).toBeDefined()
    })
  })

  it('should toggle from the default concealed state to concealed state', async () => {
    const { getByTestId, queryByTestId } = renderResult

    fireEvent.click(getByTestId('password-obfuscation-button'))

    await waitFor(() => {
      expect(getByTestId('password-revealed')).toBeDefined()

      expect(queryByTestId('password-concealed')).toBeNull()

      expect(target.setAttribute).toHaveBeenCalledWith('type', 'text')
    })

    fireEvent.click(getByTestId('password-obfuscation-button'))

    await waitFor(() => {
      expect(getByTestId('password-concealed')).toBeDefined()

      expect(queryByTestId('password-revealed')).toBeNull()

      expect(target.setAttribute).toHaveBeenCalledWith('type', 'password')
    })
  })
})
