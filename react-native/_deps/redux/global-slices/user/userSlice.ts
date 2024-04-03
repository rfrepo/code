import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    updateUser: (state, action: PayloadAction) => ({
      ...action.payload
    })
  }
})

export const { updateUser } = userSlice.actions

export default userSlice.reducer
