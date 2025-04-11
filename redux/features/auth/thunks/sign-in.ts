import { AuthService } from "@/services/auth.services";
import { SignInUserDTO } from "@/domain/types/auth.types";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

export const signInUserWithEmail = createAsyncThunk(
  'user/signInUserWithEmail',
  async (data: SignInUserDTO) => {
    try {
      return await AuthService.signIn(data)
    } catch (error) {
      isRejectedWithValue(error)
    }
  }
)
