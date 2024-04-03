import mySpinSquadReducer from '_deps/redux/slice/mySpinSquadSlice'

type ReferralsState = ReturnType<typeof mySpinSquadReducer>
describe('referralsSlice', () => {
  it('should have a default state', () => {
    const state = mySpinSquadReducer(undefined, { type: '' })

    expect(state).toMatchObject<ReferralsState>({
      events: [],
      status: 'READY'
    })
  })

  it('should have the appropriate status while loading', () => {
    const state = mySpinSquadReducer(undefined, {
      type: 'retrieve/mySpinSquadActivityFeed/pending'
    })

    expect(state.status).toEqual('LOADING')
  })

  it('should reset the loading status and set the event data sorted by date', () => {
    const state = mySpinSquadReducer({ status: 'LOADING' } as ReferralsState, {
      type: 'retrieve/mySpinSquadActivityFeed/fulfilled',
      payload: {
        events: [
          { btc_earned: 10, timestamp: '2022-02-24T19:37:43.569Z' },
          { btc_earned: 10, timestamp: '2022-03-24T19:37:43.569Z' }
        ]
      }
    })

    expect(state).toMatchObject<ReferralsState>(<ReferralsState>{
      status: 'READY',
      events: [
        { btc_earned: 10, timestamp: '2022-03-24T19:37:43.569Z' },
        { btc_earned: 10, timestamp: '2022-02-24T19:37:43.569Z' }
      ]
    })
  })
})
