import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import { AccountService } from '../../infrastructure/services/account.service';

export const fetchAccount = createAsyncThunk(
  'account/fetchAllAccounts',
  async (userId: string) => {
    try {
      return await AccountService.fetchAccount(userId);
    } catch (error) {
      isRejectedWithValue(error);
    }
  },
);
