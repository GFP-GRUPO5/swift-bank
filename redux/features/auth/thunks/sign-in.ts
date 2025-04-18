import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { setItemAsyncStorage } from "@/shared/utils/AsyncStorage";
import { AppUser } from "@/domains/authentication/types/user";
import { USER_DATA_KEY } from "@/domains/authentication/constants/async-storage-user";
import { AuthService } from "@/domains/authentication/services/auth.service";

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
