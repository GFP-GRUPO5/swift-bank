import { AuthService } from "@/modules/authentication/infrastructure/services/auth.service";
import { USER_DATA_KEY } from "@/modules/authentication/utils/async-storage-user.constants";
import { clearAsyncStorage } from "@/shared/utils/AsyncStorage";
import { getFirebaseErrorMessage } from "@/shared/utils/firebase-error-handler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";
AuthService

export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async (_, { rejectWithValue }) => {
    try {
      await clearAsyncStorage(USER_DATA_KEY)
      await AuthService.signOut()
    } catch (error) {
      if (error instanceof FirebaseError) {
        const message = getFirebaseErrorMessage(error)
        return rejectWithValue(message)
      }
    }
  }
)
