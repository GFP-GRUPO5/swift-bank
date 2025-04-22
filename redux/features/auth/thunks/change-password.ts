import { AuthService } from "@/domains/authentication/services/auth.service";
import { getFirebaseErrorMessage } from "@/shared/utils/firebase-error-handler";
import { createAsyncThunk, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (data: { currentPassword: string, newPassword: string }, { rejectWithValue }) => {
    try {
      const { currentPassword, newPassword } = data
      return await AuthService.updatePassword(currentPassword, newPassword)
    } catch (error) {
      if (error instanceof FirebaseError) {
        const message = getFirebaseErrorMessage(error)
        return rejectWithValue(message)
      }
      return rejectWithValue('Erro desconhecido')
    }
  }
)