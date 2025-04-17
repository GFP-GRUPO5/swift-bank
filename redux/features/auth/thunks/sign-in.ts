import { AuthService } from "@/services/auth.service";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { USER_DATA_KEY } from "@/domain/constants/async-storage-user";
import { setItemAsyncStorage } from "@/utils/AsyncStorage";
import { AppUser } from "@/domain/types/user";

export const signInUserWithEmail = createAsyncThunk<AppUser | undefined, { email: string, password: string }>(
  'auth/signInUserWithEmail',
  async ({ email, password }) => {
    try {
      const result = await AuthService.signIn(email, password)

      if (!result) throw new Error('Usuário não encontrado')

      setItemAsyncStorage<AppUser>(USER_DATA_KEY, result)

      return result
    } catch (error) {
      isRejectedWithValue(error)
    }
  }
)
