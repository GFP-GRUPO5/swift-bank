import { IAccount, UpdateAccountDTO } from "@/account/models/Account.dto";
import { db } from "@/firebase/config";
import { collection, doc, DocumentData, getDocs, query, QueryDocumentSnapshot, setDoc, where } from "firebase/firestore";

export class AccountService {
  static async createAccount(userId: string) {
    try {
      const accountRef = doc(db, 'accounts', userId)
      await setDoc(accountRef, {
        userId,
        accountType: 'debit',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        currentAmmount: 0.0,
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }

  static async fetchAccounts(userId: string): Promise<IAccount[]> {
    try {
      const q = query(collection(db, 'accounts'), where('userId', '==', userId))
      const result = await getDocs(q)
      const resultArray: any[] = []

      result.forEach(res => resultArray.push(res.data()))

      return resultArray
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }

      throw new Error(JSON.stringify(error))
    }
  }

  static async updateAccount(account: UpdateAccountDTO) {

  }

  static async forgotPassword(email: string) {

  }
}
