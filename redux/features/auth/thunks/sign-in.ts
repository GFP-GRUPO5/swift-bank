import { AuthService } from "@/services/auth.service";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { USER_DATA_KEY } from "@/domain/constants/async-storage-user";
import { setItemAsyncStorage } from "@/utils/AsyncStorage";
import { User } from "firebase/auth";

export const signInUserWithEmail = createAsyncThunk<User | undefined, { email: string, password: string }>(
  'auth/signInUserWithEmail',
  async ({ email, password }) => {
    try {
      const result = await AuthService.signIn(email, password)
      setItemAsyncStorage<typeof result>(USER_DATA_KEY, result)
      return result
    } catch (error) {
      isRejectedWithValue(error)
    }
  }
)
