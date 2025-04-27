import { UserData } from "@/domains/users/types/user.type"
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit"
import { fetchUserByEmail } from "./thunks/fetch-user-by-email"
import { IUserInitialState } from "./userSlice.types"

export function userExtraReducers(builder: ActionReducerMapBuilder<IUserInitialState>) {
  builder
    .addCase(fetchUserByEmail.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchUserByEmail.fulfilled, (state, { payload }: PayloadAction<UserData[]>) => {
      state.loading = false
      state.error = null
      state.user = payload[0]
    })
}