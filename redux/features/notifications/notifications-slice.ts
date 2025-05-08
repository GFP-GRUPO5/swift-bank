import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notificationsExtraReducers } from "./extra-reducers";
import { INotification, INotificationsSlice } from "./notifications.types";

const notificationInitialState: INotificationsSlice = {
  notifications: [],
  loading: false,
  errors: null,
  hasNotification: false,
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationInitialState,
  reducers: {
    updateNotifications: (state, { payload }: PayloadAction<INotification[]>) => {
      state.notifications = payload
      state.hasNotification = payload.some(notification => !notification.read)
    },
    toggleNotifcationFetchStatus: (state, { payload }) => {
      state.loading = payload
    },
    setNotifications: (state, { payload }: PayloadAction<INotification[]>) => {
      state.notifications = payload
      state.hasNotification = payload.some(notification => !notification.read)
    }
  },
  extraReducers: notificationsExtraReducers
})

export const {
  updateNotifications,
  toggleNotifcationFetchStatus,
  setNotifications,
} = notificationsSlice.actions

export default notificationsSlice.reducer
