import { UsersService } from "@/domains/users/services/users.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserByEmail = createAsyncThunk(
  'users/fetchUserByEmail',
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      return await UsersService.fetchUserByEmail(email)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)