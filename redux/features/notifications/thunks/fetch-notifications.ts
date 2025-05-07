import { NotificationService } from "@/domains/notifications/services/notification.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { INotification } from "../notifications.types";

export const fetchNotifications = createAsyncThunk<INotification[]>(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      return await NotificationService.fetchNotifications()
    } catch (error) {
      const errorMessage = JSON.stringify(error)
      return rejectWithValue(errorMessage)
    }
  }
)
