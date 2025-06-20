import { createSlice } from '@reduxjs/toolkit'
import { authInitialState } from './auth.constants'
import { authExtraReducers } from './extra-reducers'

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setUserDataFromAsyncStorage: (state, { payload }) => {
      state.user = payload
    },
    setExpirationTime: (state, { payload }) => {
      state.credentials.expiresIn = payload
    }
  },
  extraReducers: authExtraReducers
})

export const {
  setUserDataFromAsyncStorage,
  setExpirationTime,
} = authSlice.actions

export default authSlice.reducer
