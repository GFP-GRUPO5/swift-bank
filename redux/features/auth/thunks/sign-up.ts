import { AuthService } from "@/services/auth.services";
import { CreateAuthUserDTO } from "@/types/auth.types";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
    const signedUpUser = await AuthService.signUp(userInput)
    console.log(signedUpUser)
    return signedUpUser
  }
)
