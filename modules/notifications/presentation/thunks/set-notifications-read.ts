import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationService } from '../../infrastructure/services/notification.service';
import { INotification } from '../slices/notifications.types';

export const setNotificationsRead = createAsyncThunk(
  'notifications/setNotificationsRead',
  async (
    { notifications }: { notifications: INotification[] },
    { rejectWithValue },
  ) => {
    try {
      await NotificationService.updateNotifications(notifications);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
