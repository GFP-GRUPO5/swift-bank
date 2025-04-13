import { AuthService } from "@/services/auth.service";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async () => {
    try {
      await AuthService.signOut()
    } catch (error) {
      isRejectedWithValue(error)
    }
  }
)
