import { IAccount } from "@/domains/account/models/Account.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addStatement } from "./thunks/add-statements";
import { fetchAccount } from "./thunks/fetch-accounts";
import { fetchDebitAccounts } from "./thunks/fetch-debit-accounts";


interface InitialState {
  loading: boolean
  account: IAccount | null
  errors: any
  debitAccounts: IAccount | null
}

const initialState: InitialState = {
  loading: false,
  account: null,
  errors: null,
  debitAccounts: null,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // FETCH ALL ACCOUNTS
      .addCase(fetchAccount.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAccount.fulfilled, (state, { payload }) => {
        state.account = payload as IAccount
        state.loading = false
      })
      .addCase(fetchAccount.rejected, (state) => {
        state.errors = {
          hasError: true,
          error: { message: 'Aconteceu um erro ao buscar as contas.' }
        }
      })
      // FETCH DEBIT ACCOUNTS
      .addCase(fetchDebitAccounts.pending, (state) => {
        state.loading = true
        state.errors = null
      })
      .addCase(fetchDebitAccounts.fulfilled, (state, { payload }: PayloadAction<IAccount[]>) => {
        state.loading = false
      })
      .addCase(fetchDebitAccounts.rejected, (state, { payload }) => {
        state.loading = false
        state.errors = payload
      })
      // Statements
      .addCase(addStatement.pending, (state) => {
        state.loading = true
        state.errors = null
      })
      .addCase(addStatement.fulfilled, (state, { payload }: PayloadAction<IAccount>) => {
        state.loading = false
        console.log(payload)
        state.account = payload
      })
      .addCase(addStatement.rejected, (state, { payload }) => {
        state.loading = false
        state.errors = JSON.stringify(payload)
      })

  }
})

export const { } = accountSlice.actions

export default accountSlice.reducer
