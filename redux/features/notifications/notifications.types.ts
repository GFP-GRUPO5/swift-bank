export interface INotificationInfo {
  fromUserName: string
  message: string
}

export interface INotification {
  id: string
  fromUserId: string
  info: INotificationInfo
  read: boolean
  createdAt: string
  updatedAt: string
}

export interface INotificationsSlice {
  notifications: INotification[]
  loading: boolean
  errors: null | {
    hasError: boolean
    message: string
  }
  hasNotification: boolean
}
