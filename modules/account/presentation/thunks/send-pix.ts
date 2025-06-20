import { NotificationService } from "@/modules/notifications/infrastructure/services/notification.service";
import { toggleNotifcationFetchStatus } from "@/modules/notifications/presentation/slices/notifications-slice";
import { RootState } from "@/shared/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AccountService } from "../../infrastructure/services/account.service";

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
