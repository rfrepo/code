import React from 'react'
import { render } from '@testing-library/react-native'
import { EmptyState } from 'my-spin-squad/empty-state/EmptyState'

describe('MySpinSquad - EmptyState', () => {
  it('should render as expected', () => {
    const { getByText } = render(
      <EmptyState text="Refer a friend to start stacking sats on your friends’ spending!" />
    )

    expect(getByText('👀')).toBeDefined()

    expect(getByText('Nothing to see here... yet')).toBeDefined()

    expect(
      getByText(
        'Refer a friend to start stacking sats on your friends’ spending!'
      )
    ).toBeDefined()
  })
})
