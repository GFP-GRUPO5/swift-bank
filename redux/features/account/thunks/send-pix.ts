import { AccountService } from "@/domains/account/services/account.service";
import { NotificationService } from "@/domains/notifications/services/notification.service";
import { RootState } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toggleNotifcationFetchStatus } from "../../notifications/notifications-slice";

export const sendPix = createAsyncThunk(
  'account/sendPix',
  async (
    data: { value: number, userId: string },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      dispatch(toggleNotifcationFetchStatus(true))

      const { value, userId } = data
      const { auth: { user } } = getState() as RootState
      
      await AccountService.sendPixToUser(value, userId)

      await NotificationService.sendNotification(
        user?.uid!,
        userId,
        {
          fromUserName: user?.displayName!,
          message: `${user?.displayName} mandou um pix de ${value} para você.`
        }
      )
    } catch(error) {
      return rejectWithValue(error)
    } finally {
      dispatch(toggleNotifcationFetchStatus(false))
    }
  }
)