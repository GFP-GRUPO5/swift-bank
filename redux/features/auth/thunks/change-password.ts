import { AuthService } from "@/domains/authentication/services/auth.service";
import { createAsyncThunk, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (data: { currentPassword: string, newPassword: string }) => {
    try {
      console.log(data)
      const { currentPassword, newPassword } = data
      return await AuthService.updatePassword(currentPassword, newPassword)
    } catch (error) {
      isRejectedWithValue(error)
    }
  }
)