import { CreateAuthUserDTO } from '@/modules/authentication/domain/types/auth.types';
import { AuthService } from '@/modules/authentication/infrastructure/services/auth.service';
import { getFirebaseErrorMessage } from '@/shared/infra/firebase-error-handler';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';

/**
 * @param CreateAuthUserDTO
 * @description which consists in
 * @summary email: string
 * @summary name: string
 * @summary lastName: string
 * @summary password: string
 */
export const signUpUserWithEmail = createAsyncThunk(
  'auth/signUpUserWithEmail',
  async (userInput: CreateAuthUserDTO, { rejectWithValue }) => {
    try {
      await AuthService.signUp(userInput);
      await AuthService.updateUserProfile({ displayName: userInput.name });
    } catch (error) {
      if (error instanceof FirebaseError) {
        const message = getFirebaseErrorMessage(error);
        return rejectWithValue(message);
      }
      return rejectWithValue('Erro desconhecido');
    }
  },
);
