import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationService } from '../../infrastructure/services/notification.service';

interface INotificationData {
  fromUserId: string;
  toUserId: string;
  info: {
    fromUserName: string;
    message: string;
  };
}

export const sendNotification = createAsyncThunk(
  'notification/sendNotification',
  async (data: INotificationData, { rejectWithValue }) => {
    try {
      const { fromUserId, info, toUserId } = data;

      await NotificationService.sendNotification(fromUserId, toUserId, info);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
