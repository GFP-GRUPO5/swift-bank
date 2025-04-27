import { db } from "@/firebase/config"
import { FirebaseError } from "firebase/app"
import { collection, doc, getDocs, query, QueryDocumentSnapshot, setDoc, updateDoc, where } from "firebase/firestore"
import { CreateUserDTO, UserData } from "../types/user.type"



const USER_COLLECTION = 'users'

export class UsersService {
  static async createUser(userData: CreateUserDTO): Promise<void> {
    try {
      const usersCol = collection(db, USER_COLLECTION)
      const q = query(usersCol, where('email', '==', userData.email))
      const snap = await getDocs(q)

      if (!snap.empty) {
        throw new Error('Este email já esta registrado!')
      }

      const userRef = doc(db, USER_COLLECTION, userData.id)
      await setDoc(userRef, { ...userData, createdAt: new Date().toISOString() })
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(error.message)
      }

      throw error
    }
  }

  static async fetchUserByEmail(userEmail: string): Promise<UserData[]> {
    try {
      const userRef = collection(db, USER_COLLECTION)
      const q = query(userRef, where('email', '==', userEmail))
      const snap = await getDocs(q)

      if (!snap.size || !snap) {
        throw new Error('Nenhum usuário encontrado!')
      }

      return snap.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.data().id,
        name: doc.data().name,
        email: doc.data().email,
        createdAt: doc.data().createdAt,
      }))
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(error.message)
      }

      throw error
    }
  }

  static async updateUser(userId: string, userData: Partial<CreateUserDTO>): Promise<void> {
    try {
      const userRef = doc(db, USER_COLLECTION, userId)
      await updateDoc(userRef, userData)
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(error.message)
      }

      throw error
    }
  }
}