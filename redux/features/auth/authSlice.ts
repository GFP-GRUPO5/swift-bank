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
    // Sign Up Flow
    builder.addCase(signUpUserWithEmail.fulfilled, (state, { payload }) => {
      console.log(payload)
      state.loading = false
    }),
    builder.addCase(signUpUserWithEmail.pending, (state, action) => {
      state.loading = true
    }),
    builder.addCase(signUpUserWithEmail.rejected, (state, action) => {
      console.log(action)
      state.loading = false
    }),
    // Sign In Flow
    builder.addCase(signInUserWithEmail.fulfilled, () => {
      
    })
  }
})

export const {
  updateAccessToken,
} = authSlice.actions

export default authSlice.reducer
