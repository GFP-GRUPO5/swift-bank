import { db } from "@/firebase/config"
import { CreateUserDOT, FEUserDOT } from "@/models/User.dto"
import { addDoc, collection, doc, runTransaction } from "firebase/firestore"

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

        const docRef = await addDoc(collection(db, 'users'), user)
      })
    } catch (error) {
      console.error('Transaction failed: ', error)
    }
  }
}
