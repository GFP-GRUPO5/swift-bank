import {
  SignInAppUser,
  UpdateUserDTO,
} from '@/modules/authentication/domain/types/user';
import { AuthService } from '@/modules/authentication/infrastructure/services/auth.service';
import { getFirebaseErrorMessage } from '@/shared/infra/firebase-error-handler';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';

export const updateUserProfile = createAsyncThunk<SignInAppUser, UpdateUserDTO>(
  'auth/updateAuthUserProfile',
  async (data: UpdateUserDTO, { rejectWithValue }) => {
    try {
      return await AuthService.updateUserProfile(data);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const message = getFirebaseErrorMessage(error);
        return rejectWithValue(message);
      }
      return rejectWithValue('Erro desconhecido');
    }
  },
);
