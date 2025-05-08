import { NotificationService } from "@/domains/notifications/services/notification.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { INotification } from "../notifications.types";

export const setNotificationsRead = createAsyncThunk(
  'notifications/setNotificationsRead',
  async ({ notifications }: { notifications: INotification[] }, { rejectWithValue }) => {
    try {
      await NotificationService.updateNotifications(notifications)
    } catch(error) {
      return rejectWithValue(error)
    }
  }
)
