import { AuthService } from "@/domains/authentication/services/auth.service";
import { CreateAuthUserDTO } from "@/domains/authentication/types/auth.types";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { Alert } from "react-native";

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
  async (userInput: CreateAuthUserDTO) => {
    try {
      Alert.alert('Verifique seu email', 'Enviamos um email de confirmação')

      await AuthService.signUp(userInput)
      await AuthService.updateUserProfile(userInput)
    } catch (error) {
      isRejectedWithValue(error)
    }
  }
)
