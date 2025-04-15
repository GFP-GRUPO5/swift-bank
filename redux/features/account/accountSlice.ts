import { createSlice } from "@reduxjs/toolkit";
import { fetchAllAccounts } from "./thunks/fetch-accounts";
import { IAccount } from "@/domain/models/Account.dto";
import { IThunkError } from "@/domain/types/thunk-error.types";

interface InitialState {
  loading: boolean
  accounts: IAccount[]
  selectedAccount: IAccount | null
  errors: IThunkError | null
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
