import { USER_DATA_KEY } from "@/authentication/constants/async-storage-user";
import { AuthService } from "@/authentication/services/auth.service";
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
