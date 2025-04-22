import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { setItemAsyncStorage } from "@/shared/utils/AsyncStorage";
import { SignInAppUser } from "@/domains/authentication/types/user";
import { USER_DATA_KEY, USER_EXPIRATION_TIME } from "@/domains/authentication/constants/async-storage-user";
import { AuthService } from "@/domains/authentication/services/auth.service";

export const signInUserWithEmail = createAsyncThunk<SignInAppUser | undefined, { email: string, password: string }>(
  'auth/signInUserWithEmail',
  async ({ email, password }) => {
    try {
      const result = await AuthService.signIn(email, password)

      if (!result) throw new Error('Usuário não encontrado')

      setItemAsyncStorage<SignInAppUser>(USER_DATA_KEY, result)
      setItemAsyncStorage<string>(USER_EXPIRATION_TIME, result.expirationTime!)

      return result
    } catch (error) {
      isRejectedWithValue(error)
    }
  }
)
