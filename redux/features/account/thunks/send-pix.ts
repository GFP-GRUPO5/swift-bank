import { AccountService } from "@/domains/account/services/account.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendPix = createAsyncThunk(
  'account/sendPix',
  async (data: { value: number, userId: string }, { rejectWithValue }) => {
    try {
      const { value, userId } = data
      await AccountService.sendPixToUser(value, userId)
    } catch(error) {
      return rejectWithValue(error)
    }
  }
)