import { db } from "@/firebase/config"
import { CreateUserDOT, FEUserDOT } from "@/domain/models/User.dto"
import { addDoc, collection, doc, getDoc, runTransaction } from "firebase/firestore"
import { FirebaseSimplification } from "@/firebase/firebase-simplifications"

export class UserService {
  static async createUser(userData: CreateUserDOT) {
    const user: FEUserDOT = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const email = user.email!.toLowerCase()
    const emailDocRef = doc(db, 'uniqueEmails', email)

    try {
      await runTransaction(db, async (transaction) => {
        const emailDoc = await transaction.get(emailDocRef)

        if (emailDoc.exists()) {
          throw new Error('This email is already in use.')
        }

        await addDoc(collection(db, 'users'), user)
      })
    } catch (error) {
      console.error('Transaction failed: ', error)
    }
  }

  static async fetchUserById(userId: string) {
    try {
      const result = await FirebaseSimplification.fetchDocumentById(userId, 'users')

      if (result?.exists()) {
        return result.data()
      }

      throw new Error('User not found')
      
    } catch (error) {
      if (error instanceof Error) {
          throw new Error(error.message)
      }
      throw new Error(JSON.stringify(error))
    }
  }
}
