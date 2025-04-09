import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  credentials: {
    accessToken: string | null
  }
}

const initialState: IInitialState = {
  credentials: {
    accessToken: null 
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAccessToken: (state, { payload: { accessToken } }) => {
      state.credentials.accessToken = accessToken
    }
  }
})

export const {
  updateAccessToken,
} = authSlice.actions

export default authSlice.reducer
