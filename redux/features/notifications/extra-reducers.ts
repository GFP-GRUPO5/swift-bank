import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { INotification, INotificationsSlice } from "./notifications.types";
import { fetchNotifications } from "./thunks/fetch-notifications";
import { sendNotification } from "./thunks/send-notification";

export function notificationsExtraReducers(builder: ActionReducerMapBuilder<INotificationsSlice>) {
  builder
    // SEND NOTIFICATIONS
    .addCase(sendNotification.pending, (state) => {
      state.loading = true
      state.errors = null
    })
    .addCase(sendNotification.fulfilled, (state, { payload }: PayloadAction<void>) => {
      state.loading = false
      state.errors = null
    })
    .addCase(sendNotification.rejected, (state, { payload }) => {
      state.errors = {
        hasError: true,
        message: payload as string,
      }
    })
    // FETCH ALL NOTIFICATIONS
    .addCase(fetchNotifications.pending, (state) => {
      state.errors = null
      state.loading = true
    })
    .addCase(fetchNotifications.fulfilled, (state, { payload }: PayloadAction<INotification[]>) => {
      state.errors = null
      state.hasNotification = payload.some(item => item.read)
      state.notifications = payload
    })
    .addCase(fetchNotifications.rejected, (state, { payload }) => {
      state.errors = {
        hasError: true,
        message: JSON.stringify(payload)
      }
    })
}
