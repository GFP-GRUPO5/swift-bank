import { AuthService } from "@/services/auth.service";
import { CreateAuthUserDTO } from "@/domain/types/auth.types";
import { createAsyncThunk, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";

/**
 * @param CreateAuthUserDTO
 * @description which consists in
 * @summary email: string
 * @summary name: string
 * @summary lastName: string
 * @summary password: string
 */
export const signUpUserWithEmail = createAsyncThunk(
  'users/signInUserWithEmail',
  async (userInput: CreateAuthUserDTO) => {
    try {
      return await AuthService.signUp(userInput)
    } catch (error) {
      isRejectedWithValue(error)
    }
  }
)
