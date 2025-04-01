import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null

}

interface IInitialUserState {
  id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null
}

const initialState: IInitialUserState = {
  id: null,
  name: null,
  email: null,
  phone: null
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createUser: (state, {payload}: PayloadAction <IUser> ) => {
      state = payload
    }
  }
})
