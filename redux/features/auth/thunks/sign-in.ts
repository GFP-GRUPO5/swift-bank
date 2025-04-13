import { AuthService } from "@/services/auth.service";
import { SignInUserDTO } from "@/domain/types/auth.types";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_DATA_KEY } from "@/domain/constants/async-storage-user";
import { setItemAsyncStorage } from "@/utils/AsyncStorage";

export const signInUserWithEmail = createAsyncThunk(
  'user/signInUserWithEmail',
  async (data: SignInUserDTO) => {
    try {
      const result = await AuthService.signIn(data)
      setItemAsyncStorage<typeof result>(USER_DATA_KEY, result)
      return result
    } catch (error) {
      isRejectedWithValue(error)
    }
  }
)
