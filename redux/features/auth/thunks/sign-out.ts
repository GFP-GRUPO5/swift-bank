import { USER_DATA_KEY } from "@/domains/authentication/constants/async-storage-user";
import { AuthService } from "@/domains/authentication/services/auth.service";
AuthService
import { clearAsyncStorage } from "@/shared/utils/AsyncStorage";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async () => {
    try {
      await clearAsyncStorage(USER_DATA_KEY)
      await AuthService.signOut()
    } catch (error) {
      isRejectedWithValue(error)
    }
  }
)
