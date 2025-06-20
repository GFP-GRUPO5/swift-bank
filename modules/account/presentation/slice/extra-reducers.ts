
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit"
import { addStatement } from "../../../../modules/account/presentation/thunks/add-statements"
import { fetchAccount } from "../../../../modules/account/presentation/thunks/fetch-account"
import { sendPix } from "../../../../modules/account/presentation/thunks/send-pix"
import { IAccount } from "../../models/Account.dto"
import { IAccountInitialState } from "./account-slice.types"

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
