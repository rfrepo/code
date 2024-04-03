import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { retrieveMySpinSquadActivityFeed } from '_deps/redux/thunks/retrieveMySpinSquadActivityFeed'

export type SquadActivityFeed = {
  timestamp: string
  btc_earned: number
  event_description: 'Purchase'
}
export type SquadActivityMeta = {
  content: string
  referral_cap: number
  total_btc_earned: number
  min_sats_per_purchase: number
  max_sats_per_purchase: number
  referred_cardholder_count: number
}

export interface MySpinSquadState {
  meta?: SquadActivityMeta
  events: SquadActivityFeed[]
  status: 'READY' | 'LOADING' | 'ERROR'
}

const initialState: MySpinSquadState = {
  events: [],
  status: 'READY'
} as MySpinSquadState

const mySpinSquadSlice = createSlice({
  reducers: {},
  initialState,
  name: 'mySpinSquad',
  extraReducers: builder => {
    builder.addCase(retrieveMySpinSquadActivityFeed.pending, state => {
      state.status = 'LOADING'
    })

    builder.addCase(
      retrieveMySpinSquadActivityFeed.fulfilled,
      (
        state: MySpinSquadState,
        action: PayloadAction<Omit<MySpinSquadState, 'status'>>
      ) => {
        const { events, ...meta } = action.payload

        state.events = events.sort(
          (a, b) =>
            Number(new Date(b.timestamp)) - Number(new Date(a.timestamp))
        )

        state.status = 'READY'

        state.meta = meta as SquadActivityMeta
      }
    )
  }
})

export default mySpinSquadSlice.reducer
