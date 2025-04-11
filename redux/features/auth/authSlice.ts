import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './auth.constants'
import { signUpUserWithEmail } from './thunks/sign-up'
import { signInUserWithEmail } from './thunks/sign-in'

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAccessToken: (state, { payload: { accessToken } }) => {
      state.credentials.accessToken = accessToken
    }
  },
  extraReducers: (builder) => {
    builder
      // Sign Up Flow 
      .addCase(signUpUserWithEmail.pending, (state) => {
        state.loading = true
        return state
      })
      .addCase(signUpUserWithEmail.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload
        return state
      })
      .addCase(signUpUserWithEmail.rejected, (state) => {
        state.loading = false
        return state
      })
      // Sign In Flow
      .addCase(signInUserWithEmail.pending, (state, { payload }) => {
        state.loading = true
        return state
      })
      .addCase(signInUserWithEmail.fulfilled, (state, { payload }) => {
        state.user = payload
        state.loading = false
        return state
      })
      .addCase(signInUserWithEmail.rejected, (state, { payload }) => {
        state.loading = false
        return state
      })
  }
})

export const {
  updateAccessToken,
} = authSlice.actions

export default authSlice.reducer
