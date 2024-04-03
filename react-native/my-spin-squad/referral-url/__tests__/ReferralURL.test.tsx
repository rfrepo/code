import React from 'react'
import { render } from '@testing-library/react-native'
import { ReferralURL } from 'my-spin-squad/referral-url/ReferralURL'

jest.mock('_deps/redux/hooks', () => ({
  useAppSelector: jest
    .fn()
    .mockReturnValue({ url: 'https://ocean-torch-use.foldapp.com/r/RWXEMFJE' })
}))

describe('ReferralURL', () => {
  let renderResult: ReturnType<typeof render>

  beforeEach(() => {
    renderResult = render(<ReferralURL />)
  })

  it('should render as expected', () => {
    const { getByText } = renderResult

    expect(getByText('Tap to copy')).toBeDefined()

    expect(getByText('Your Referral Link')).toBeDefined()

    expect(getByText('ocean-torch-use.foldapp.com/r/RWXEMFJE')).toBeDefined()
  })
})
