import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationService } from '../../infrastructure/services/notification.service';
import { INotification } from '../slices/notifications.types';

export const fetchNotifications = createAsyncThunk<INotification[]>(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      return await NotificationService.fetchNotifications();
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      return rejectWithValue(errorMessage);
    }
  },
);
