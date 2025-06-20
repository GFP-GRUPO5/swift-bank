import { AuthService } from "@/modules/authentication/infrastructure/services/auth.service";
import { SignInAppUser } from "@/modules/authentication/types/user";
import { USER_DATA_KEY, USER_EXPIRATION_TIME } from "@/modules/authentication/utils/async-storage-user.constants";
import { setItemAsyncStorage } from "@/shared/utils/AsyncStorage";
import { getFirebaseErrorMessage } from "@/shared/utils/firebase-error-handler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";

export const signInUserWithEmail = createAsyncThunk<SignInAppUser | undefined, { email: string, password: string }>(
  'auth/signInUserWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await AuthService.signIn(email, password)

      if (!result) throw new Error('Usuário não encontrado')

      await setItemAsyncStorage<SignInAppUser>(USER_DATA_KEY, result)
      await setItemAsyncStorage<string>(USER_EXPIRATION_TIME, result.expirationTime!)

      return result
    } catch (error) {
      if (error instanceof FirebaseError) {
        const message = getFirebaseErrorMessage(error)
        return rejectWithValue(message)
      }
      return rejectWithValue('Erro desconhecido')
    }
  }
)
