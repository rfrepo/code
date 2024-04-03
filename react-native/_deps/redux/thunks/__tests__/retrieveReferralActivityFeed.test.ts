import { createAsyncThunk } from '@reduxjs/toolkit'

jest.mock('@reduxjs/toolkit', () => ({
  createAsyncThunk: jest.fn()
}))

describe('retrieveReferralActivityFeed', () => {
  const path =
    'src/redux/thunks/retrieveMySpinSquadActivityFeed'

  it('should spin squad activity data', async () => {
    require(path)

    expect(createAsyncThunk).toHaveBeenCalledWith(
      'retrieve/mySpinSquadActivityFeed',
      expect.any(Function)
    )
  })
})
