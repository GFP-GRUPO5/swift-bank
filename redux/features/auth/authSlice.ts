import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './auth.constants'
import { signUpUserWithEmail } from './auth.thunks'

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAccessToken: (state, { payload: { accessToken } }) => {
      state.credentials.accessToken = accessToken
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUserWithEmail.fulfilled, (state, action) => {
      console.log(action)
      return state
    })
  }
})

export const {
  updateAccessToken,
} = authSlice.actions

export default authSlice.reducer
