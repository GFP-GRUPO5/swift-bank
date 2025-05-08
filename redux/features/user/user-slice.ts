import { createSlice } from "@reduxjs/toolkit";
import { userExtraReducers } from "./extra-reducers";
import { IUserInitialState } from "./user-slice.types";


const initialState: IUserInitialState = {
  loading: false,
  error: {
    hasError: false,
    message: null,
  },
  user: null,
}

export const usersSlice = createSlice({
  initialState,
  name: 'users',
  reducers: {
    clearSelectedUser: (state) => {
      state.user = null
    }
  },
  extraReducers: userExtraReducers
})

export const {
  clearSelectedUser,
} = usersSlice.actions

export default usersSlice.reducer
