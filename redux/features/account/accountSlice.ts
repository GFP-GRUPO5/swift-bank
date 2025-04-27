import { createSlice } from "@reduxjs/toolkit";
import { accountSliceInitialState as initialState } from './accountSlice.constants';
import { buildCases } from "./extra-reducers";

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: buildCases
})

export const { } = accountSlice.actions

export default accountSlice.reducer
