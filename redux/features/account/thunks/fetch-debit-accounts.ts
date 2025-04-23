import { AccountService } from "@/domains/account/services/account.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDebitAccounts = createAsyncThunk(
  'account/fetchDebitAccounts',
  async ({ accountId }: { accountId: string }, { rejectWithValue }) => {
    try {
      const accounts = AccountService.fetchDebitAccount(accountId)
      if (!accounts) {
        throw new Error('Encontramos um erro ao procurar as contas de débito')
      }
      return accounts
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
