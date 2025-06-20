import { auth, db } from "@/config/firebase/config";

import {
  collection,
  limit,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { INotification } from "../../presentation/slices/notifications.types";
import { NOTIFICATIONS_COLLECTION } from "../../utils/notifications-collection.constants";



export function listenToNotifications(callback: (notifications: INotification[]) => void) {
  try {
      const { currentUser } = auth

      if (!currentUser) {
        throw new Error('Usuário não logado!')
      }

      const notificationsRef = collection(db, NOTIFICATIONS_COLLECTION, currentUser?.uid, NOTIFICATIONS_COLLECTION)

      const q = query(
        notificationsRef,
        where("read", "==", false),
        limit(20),
      )

      return onSnapshot(q, (snapshot) => {
        const notifications = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            createdAt: doc.data().createdAt,
            fromUserId: doc.data().fromUserId,
            info: doc.data().info,
            read: doc.data().read,
            updatedAt: doc.data().updatedAt,
          } as INotification
        })

        callback(notifications)
      })
  } catch (error) {
    throw error
  }
}
