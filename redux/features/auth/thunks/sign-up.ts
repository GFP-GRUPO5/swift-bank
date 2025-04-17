import { AuthService } from "@/services/auth.service";
import { CreateAuthUserDTO } from "@/domain/types/auth.types";
import { createAsyncThunk, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
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
      return await AuthService.signUp(userInput)
    } catch (error) {
      isRejectedWithValue(error)
    }
  }
)
