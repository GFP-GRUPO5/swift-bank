import { AuthService } from "@/domains/authentication/services/auth.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendForgotPasswordEmail = createAsyncThunk(
  'auth/sendForgotPasswordEmail',
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      await AuthService.forgotPassword(email)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
