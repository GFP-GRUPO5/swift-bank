import { createSlice } from "@reduxjs/toolkit";
import { fetchAllAccounts } from "./thunks/fetch-accounts";
import { IAccount } from "@/domains/account/models/Account.dto";

interface InitialState {
  loading: boolean
  accounts: IAccount[]
  selectedAccount: IAccount | null
  errors: any
}

const initialState: InitialState = {
  loading: false,
  accounts: [],
  selectedAccount: null,
  errors: null
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllAccounts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllAccounts.fulfilled, (state, { payload }) => {
        state.accounts = payload as IAccount[]
        state.loading = false
      })
      .addCase(fetchAllAccounts.rejected, (state) => {
        state.errors = {
          hasError: true,
          error: { message: 'Aconteceu um erro ao buscar as contas.' }
        }
      })
  }
})

export const {

} = accountSlice.actions

export default accountSlice.reducer
