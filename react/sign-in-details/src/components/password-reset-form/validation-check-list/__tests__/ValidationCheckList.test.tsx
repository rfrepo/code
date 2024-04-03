import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { ValidationCheckList } from 'components/password-reset-form/validation-check-list/ValidationCheckList'

describe('ValidationCheckList', () => {
  let renderResult: ReturnType<typeof render>

  beforeEach(() => {
    renderResult = render(
      <ValidationCheckList
        minChars={false}
        commonChar={false}
        capitalChar={false}
        specialCharOrNum={false}
      />
    )
  })

  it('should render as rule list', async () => {
    const { getByText } = renderResult

    await waitFor(() => {
      expect(getByText(/8 characters minimum/)).toBeDefined()

      expect(getByText(/1 lowercase letter/)).toBeDefined()

      expect(getByText(/1 capital letter/)).toBeDefined()

      expect(getByText(/1 number/)).toBeDefined()
    })
  })
})
