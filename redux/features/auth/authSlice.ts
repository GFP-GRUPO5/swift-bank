import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './auth.constants'
import { signUpUserWithEmail } from './thunks/sign-up'
import { signInUserWithEmail } from './thunks/sign-in'
import { UserDTO } from '@/domains/authentication/models/User.dto'
import { signOutUser } from './thunks/sign-out'
import { changePassword } from './thunks/change-password'

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
        state.signUpMetadata.loading = true
        state.signUpMetadata.error = null
      })
      .addCase(signUpUserWithEmail.fulfilled, (state) => {
        state.signUpMetadata.isFufilled = true
        state.signUpMetadata.loading = false
      })
      .addCase(signUpUserWithEmail.rejected, (state, { payload }) => {
        state.signUpMetadata.isFufilled = true
        state.signUpMetadata.loading = false
        state.signUpMetadata.error = {
          hasError: true,
          details: payload,
          message: 'Error while signing user with email!'
        }
      })
      // Sign In Flow
      .addCase(signInUserWithEmail.pending, (state, { payload }) => {
        state.signInMetadata.loading = true
        state.signInMetadata.error = null
      })
      .addCase(signInUserWithEmail.fulfilled, (state, { payload }) => {
        state.signInMetadata.loading = false
        state.signInMetadata.isFufilled = true
        state.user = payload
      })
      .addCase(signInUserWithEmail.rejected, (state, { payload }) => {
        state.signInMetadata.loading = false
        state.signInMetadata.isFufilled = true
        state.signInMetadata.error = {
          details: payload,
          hasError: true,
          message: 'Error while siging in user with email'
        }
      })
      // Sign Out Flow
      .addCase(signOutUser.pending, (state) => {
        state.signOutMetadata.loading = true
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.signOutMetadata.isFufilled = true
        state.signOutMetadata.loading = false
        state.user = undefined
      })
      .addCase(signOutUser.rejected, (state, { payload }) => {
        state.signOutMetadata.isFufilled = true
        state.signOutMetadata.loading = false
        state.signOutMetadata.error = {
          hasError: true,
          details: payload,
          message: 'Ocorreu um erro ao sair da conta'
        }
      })
      // Change Password Flow
      .addCase(changePassword.pending, (state) => {
        state.changePasswordMetadata.error = null
        state.changePasswordMetadata.loading = true
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.changePasswordMetadata.loading = false
        state.changePasswordMetadata.isFufilled = true
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        state.changePasswordMetadata.isFufilled = true
        state.changePasswordMetadata.loading = false
        state.changePasswordMetadata.error = {
          details: payload,
          hasError: true,
          message: 'Ocorreu um erro ao alterar a senha'
        }
      })
  }
})

export const {
  updateAccessToken,
  setUserDataFromAsyncStorage,
} = authSlice.actions

export default authSlice.reducer
