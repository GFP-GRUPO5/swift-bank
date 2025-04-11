import { AuthService } from "@/services/auth.services";
import { SignInUserDTO } from "@/types/auth.types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signInUserWithEmail = createAsyncThunk(
  'user/signInUserWithEmail',
  async (data: SignInUserDTO) => {
    return await AuthService.signIn(data)
  }
)