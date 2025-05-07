import { auth, db } from "@/firebase/config";
import { INotification } from "@/redux/features/notifications/notifications.types";
import { UnauthenticatedError } from "@/shared/custom-errors/Unauthenticated";
import { FirebaseError } from "firebase/app";
import { addDoc, collection, doc, getDocs, limit, orderBy, query, writeBatch } from "firebase/firestore";
import { NOTIFICATIONS_COLLECTION } from "../constants/notifications-collection.const";

export class NotificationService {
  static async fetchNotifications(): Promise<INotification[]> {
    try {
      const user = auth.currentUser;
      if (!user?.uid) {
        throw new Error('Usuário não logado!');
      }

      const notificationRef = collection(
        db,
        NOTIFICATIONS_COLLECTION,
        user.uid,
        NOTIFICATIONS_COLLECTION
      );

      const q = query(
        notificationRef,
        orderBy('createdAt', 'desc'),
        limit(25)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        createdAt: new Date(doc.data().createdAt).toISOString(),
        updatedAt: new Date(doc.data().updatedAt).toISOString(),
        read: doc.data().read,
        fromUserId: doc.data().fromUserId,
        info: doc.data().info,
      }));
    } catch (error: any) {
      throw {
        message: error?.message ?? 'Erro desconhecido',
        code: error?.code ?? null,
        stack: error?.stack ?? null,
      };
    }
  }

  static async sendNotification(fromUserId: string, toUserId: string, info: { fromUserName: string, message: string }) {
    try {
      if (!fromUserId || !toUserId) {
        let message: string = ''

        if (!fromUserId) {
          message = 'Usuário não encontrado!'
        } else if (!toUserId) {
          message = 'Usuário de destino, não encontrado!'
        }

        throw new Error(message)
      }
      const notificationRef = collection(db, NOTIFICATIONS_COLLECTION, toUserId, NOTIFICATIONS_COLLECTION)
      await addDoc(notificationRef, {
        fromUserId,
        info,
        read: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(error.message)
      }
      throw error
    }
  }

  static async updateNotifications(notifications: INotification[]) {
    try {
      const user = auth.currentUser

      if (!user) throw new UnauthenticatedError()

      const batch = writeBatch(db)

      const updatedNotifications = notifications.map(notification => ({
        ...notification,
        read: true,
      }))

      updatedNotifications.forEach(notification => {
        const docRef = doc(db, NOTIFICATIONS_COLLECTION, user.uid, NOTIFICATIONS_COLLECTION, notification.id)
        batch.update(docRef, notification)
      })

      await batch.commit()

    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(error.message)
      }

      if (error instanceof Error) {
        throw new Error(error.message)
      }

      throw new Error(JSON.stringify(error))
    }
  }
}
