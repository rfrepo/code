import React from 'react'
import { render } from '@testing-library/react-native'
import { useAppSelector } from '_deps/redux/hooks'

import { SquadActivityList } from 'my-spin-squad/squad-activity-list/SquadActivityList'

jest.mock('_deps/redux/hooks', () => ({
  useAppSelector: jest.fn().mockReturnValue({
    events: []
  })
}))

jest.mock('_deps/services/converter', () => ({
  btcToSats: (value: number) => value
}))

jest.mock(
  '_deps/redux/thunks/retrieveMySpinSquadActivityFeed',
  () => ({
    retrieveMySpinSquadActivityFeed: jest.fn()
  })
)

describe('SquadActivityList', () => {
  const useAppSelectorMock = useAppSelector as jest.Mock

  beforeEach(() => {
    useAppSelectorMock.mockReset()
  })

  it('should render the loading data state', () => {
    useAppSelectorMock.mockReturnValue({ status: 'LOADING', events: [] })

    const { getByA11yHint } = render(<SquadActivityList />)

    expect(getByA11yHint('loading')).toBeDefined()
  })

  it('should render the referral activity items', () => {
    useAppSelectorMock.mockReturnValue({
      events: [
        {
          btc_earned: 10,
          timestamp: '2022-03-18T18:52:15.898Z',
          event_description: 'Squad swipe'
        },
        {
          btc_earned: 10.99,
          timestamp: '2022-02-18T19:34:50.765Z',
          event_description: 'Squad swipe'
        }
      ]
    })

    const { getByText, getAllByText } = render(<SquadActivityList />)

    expect(getByText(/\+10 sat/)).toBeDefined()

    expect(getByText(/03\/18\/2022/)).toBeDefined()

    expect(getByText(/\+11 sat/)).toBeDefined()

    expect(getByText(/02\/18\/2022/)).toBeDefined()

    expect(getAllByText(/Squad swipe/).length).toBe(2)
  })

  it('should render the no activity empty state', () => {
    useAppSelectorMock.mockReturnValue({
      events: []
    })

    const { getByText } = render(<SquadActivityList />)

    expect(getByText('👀')).toBeDefined()

    expect(getByText('Nothing to see here... yet')).toBeDefined()

    expect(
      getByText(
        `When your friends sign up for the Fold Card, you'll be rewarded for their spending here!`
      )
    ).toBeDefined()
  })
})
