import { AccountService } from "@/domains/account/services/account.service";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

export const fetchAccount = createAsyncThunk(
  'account/fetchAllAccounts',
  async (userId: string) => {
    try {
      return await AccountService.fetchAccount(userId)
    } catch (error) {
      isRejectedWithValue(error)
    }
  }
)