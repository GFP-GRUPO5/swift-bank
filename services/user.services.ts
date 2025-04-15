import { db } from "@/firebase/config"
import { CreateUserDOT, UserDTO } from "@/domain/models/User.dto"
import { doc, getDoc, runTransaction, setDoc } from "firebase/firestore"

export class UserService {
  static async createUser(userData: CreateUserDOT): Promise<void> {
    const user: UserDTO = {
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const email = user.email!.toLowerCase()
    const emailDocRef = doc(db, 'uniqueEmails', email)

    try {
      await runTransaction(db, async (transaction) => {
        const emailDoc = await transaction.get(emailDocRef)

        if (emailDoc.exists()) {
          throw new Error('This email is already in use.')
        }

        const userRef = doc(db, 'users', user.id!)
        await setDoc(userRef, user)
      })
    } catch (error) {
      console.error('Transaction failed: ', error)
    }
  }

  static async fetchUserById(userId: string) {
    try {
      const userRef = doc(db, 'users', userId)
      const result = await getDoc(userRef)

      if (!result.exists()) {
        throw new Error('User not found')
      }

      return result.data()
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(JSON.stringify(error))
    }
  }
}
