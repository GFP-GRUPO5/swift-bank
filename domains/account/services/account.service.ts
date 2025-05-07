import { auth, db } from "@/firebase/config";
import { FirebaseError } from "firebase/app";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { IAccount } from "../models/Account.dto";
import { CreateStatementDTO } from "../types/statements.types";

const ACCOUNT_COLLECTION = 'accounts'
export class AccountService {
  static async createAccount(userId: string) {
    try {
      const accountRef = doc(db, ACCOUNT_COLLECTION, userId)
      await setDoc(accountRef, {
        userId,
        accountType: 'debit',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        currentAmount: 0.0,
        statements: [],
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }

  static async fetchAccount(userId: string): Promise<IAccount> {
    try {
      const accountRef = doc(db, ACCOUNT_COLLECTION, userId)
      const snap = await getDoc(accountRef)

      if (!snap.exists()) {
        throw new Error('Conta não encontrada')
      }

      return {
        accountType: snap.data().accountType,
        createdAt: snap.data().createdAt,
        currentAmount: snap.data().currentAmount,
        id: snap.data().userId,
        statements: snap.data().statements,
        updatedAt: snap.data().updatedAt,
        userId: snap.data().userId,
      } as IAccount
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }

      throw new Error(JSON.stringify(error))
    }
  }

  static async updateStatement(accountId: string, statement: CreateStatementDTO): Promise<IAccount> {
    try {
      const accountRef = doc(db, ACCOUNT_COLLECTION, accountId)

      await updateDoc(accountRef, {
        statements: arrayUnion(statement),
        currentAmount: increment(statement.value),
        updatedAt: new Date().toISOString(),
      })

      const snap = await getDoc(accountRef)

      if (!snap.exists()) {
        throw new Error('Conta não achada!!!')
      }

      const payload: IAccount = {
        accountType: snap.data().accountType,
        createdAt: new Date(snap.data().createdAt).toISOString(),
        currentAmount: snap.data().currentAmount,
        id: snap.id,
        statements: snap.data().statements,
        updatedAt: new Date(snap.data().updatedAt).toDateString(),
        userId: snap.data().userId,
      }

      return payload
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(error.message)
      }
      throw new Error('Não rolou alguma coisa aqui!')
    }
  }

  static async sendPixToUser(value: number, userId: string): Promise<void> {
    try {
      const currentUser = auth.currentUser

      if (!currentUser) {
        throw new Error('Usuário não logado!')
      }

      const senderRef = doc(db, ACCOUNT_COLLECTION, currentUser?.uid)

      this.updateStatement(senderRef.id,
        {
          category: 'pix',
          createdAt: new Date().toISOString(),
          type: 'pix',
          value: -value,
        }
      )

      const otherUserAccountRef = doc(db, ACCOUNT_COLLECTION, userId)
      await this.updateStatement(
        otherUserAccountRef.id,
        {
          category: 'pix',
          createdAt: new Date().toISOString(),
          type: 'pix',
          value,
        }
      )
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(JSON.stringify(error))
      }
      throw error
    }
  }
}
