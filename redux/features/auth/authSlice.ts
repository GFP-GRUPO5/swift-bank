import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './auth.constants'
import { signUpUserWithEmail } from './thunks/sign-up'
import { signInUserWithEmail } from './thunks/sign-in'
import { UserDTO } from '@/domain/models/User.dto'
import { signOutUser } from './thunks/sign-out'

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAccessToken: (state, { payload: { accessToken } }) => {
      state.credentials.accessToken = accessToken
    },
    setUserDataFromAsyncStorage: (state, { payload }) => {
      state.user = payload
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
        state.errors = payload
        return state
      })
      .addCase(signUpUserWithEmail.rejected, (state) => {
        state.loading = false
        state.errors = {
          hasError: true,
          error: { message: 'Ocorreu um erro ao tentar entrar no Swift Bank' }
        }
        return state
      })
      // Sign In Flow
      .addCase(signInUserWithEmail.pending, (state, { payload }) => {
        state.loading = true
        return state
      })
      .addCase(signInUserWithEmail.fulfilled, (state, { payload }) => {
        state.user = payload as UserDTO
        state.loading = false
        return state
      })
      .addCase(signInUserWithEmail.rejected, (state, { payload }) => {
        state.loading = false
        return state
      })
      // Sign Out Flow
      .addCase(signOutUser.pending, (state) => {
        state.loading = true
        return state
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.loading = false
        state.user = null
        return state
      })
      .addCase(signOutUser.rejected, (state) => {
        state.loading = false
        state.errors = {
          hasError: true,
          error: { message: 'Ocorreu um erro ao sair da conta' }
        }
        return state
      })
  }
})

export const {
  updateAccessToken,
  setUserDataFromAsyncStorage,
} = authSlice.actions

export default authSlice.reducer
