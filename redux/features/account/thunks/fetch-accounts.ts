import { AccountService } from "@/domains/account/services/account.service";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

export const fetchAllAccounts = createAsyncThunk(
  'account/fetchAllAccounts',
  async (userId: string) => {
    try {
      return await AccountService.fetchAccounts(userId)
    } catch (error) {
      isRejectedWithValue(error)
    }
  }
)