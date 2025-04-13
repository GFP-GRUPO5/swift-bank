import { db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";

export class AccountService {
  static async createAccount(userId: string) {
    try {
      const accountRef = doc(db, 'accounts', userId)
      await setDoc(accountRef, {
        userId,
        accountType: 'debit',
        createdAt: new Date(),
        updatedAt: new Date(),
        currentAmmount: 0.0,
      })
    } catch(error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }
}
