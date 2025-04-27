import { IAccount } from "@/domains/account/models/Account.dto"
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit"
import { IAccountInitialState } from "./accountSlice.types"
import { addStatement } from "./thunks/add-statements"
import { fetchAccount } from "./thunks/fetch-account"
import { sendPix } from "./thunks/send-pix"

export function buildCases (builder: ActionReducerMapBuilder<IAccountInitialState>) {
    builder
      // FETCH ALL ACCOUNTS
      .addCase(fetchAccount.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAccount.fulfilled, (state, { payload }) => {
        state.currentAccount = payload as IAccount
        state.loading = false
      })
      .addCase(fetchAccount.rejected, (state) => {
        state.errors = {
          hasError: true,
          error: { message: 'Aconteceu um erro ao buscar as contas.' }
        }
      })
      // Statements
      .addCase(addStatement.pending, (state) => {
        state.loading = true
        state.errors = null
      })
      .addCase(addStatement.fulfilled, (state, { payload }: PayloadAction<IAccount>) => {
        state.loading = false
        state.currentAccount = payload
      })
      .addCase(addStatement.rejected, (state, { payload }) => {
        state.loading = false
        state.errors = JSON.stringify(payload)
      })
      // SEND PIX
      .addCase(sendPix.pending, (state) => {
        state.loading = true
        state.errors = null
      })
      .addCase(sendPix.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(sendPix.rejected, (state, { payload }) => {
        state.loading = false
        state.errors = JSON.stringify(payload)
      })
  }