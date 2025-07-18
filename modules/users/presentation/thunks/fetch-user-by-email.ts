import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersService } from '../../infrastructure/services/users.service';

export const fetchUserByEmail = createAsyncThunk(
  'users/fetchUserByEmail',
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      return await UsersService.fetchUserByEmail(email);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
