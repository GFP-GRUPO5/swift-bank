import { AuthService } from "@/domains/authentication/services/auth.service";
import { SignInAppUser, UpdateUserDTO } from "@/domains/authentication/types/user";
import { getFirebaseErrorMessage } from "@/shared/utils/firebase-error-handler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";

export const updateUserProfile = createAsyncThunk<SignInAppUser, UpdateUserDTO>(
  'auth/updateAuthUserProfile',
  async (data: UpdateUserDTO, { rejectWithValue }) => {
    try {
      return await AuthService.updateUserProfile(data)
    } catch (error) {
      if (error instanceof FirebaseError) {
        const message = getFirebaseErrorMessage(error)
        return rejectWithValue(message)
      }
      return rejectWithValue('Erro desconhecido')
    }
  }
)
