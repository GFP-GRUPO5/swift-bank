import { USER_DATA_KEY } from "@/domains/authentication/constants/async-storage-user";
import { AuthService } from "@/domains/authentication/services/auth.service";
AuthService
import { clearAsyncStorage } from "@/shared/utils/AsyncStorage";
import { getFirebaseErrorMessage } from "@/shared/utils/firebase-error-handler";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";

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
