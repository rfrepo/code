import React from 'react'
import { EmailCard } from '../EmailCard'
import { render, waitFor } from '@testing-library/react'

describe('EmailCard', () => {
  const email = 'email@domain.com'

  let enterEditMode: () => void

  let renderResult: ReturnType<typeof render>

  beforeEach(() => {
    enterEditMode = jest.fn()

    renderResult = render(
      <EmailCard email={email} enterEditMode={enterEditMode} />
    )
  })

  it('should render the edit button with icon', async () => {
    const { getByTestId } = renderResult

    await waitFor(() => {
      expect(getByTestId(/edit-icon/)).toBeDefined()
    })
  })

  it('should call edit mode method prop', async () => {
    const { getByTestId } = renderResult

    getByTestId(/email-edit-button/).click()

    await waitFor(() => {
      expect(enterEditMode).toHaveBeenCalled()
    })
  })
})
