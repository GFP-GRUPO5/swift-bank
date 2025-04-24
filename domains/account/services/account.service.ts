import { db } from "@/firebase/config";
import { FirebaseError } from "firebase/app";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  QueryDocumentSnapshot,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { IAccount } from "../models/Account.dto";
import { CreateStatementDTO } from "../types/statements.types";

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
      const accountRef = doc(db, 'accounts', userId)
      const snap = await getDoc(accountRef)

      if (!snap.exists()) {
        throw new Error('Conta não encontrada')
      }

      return snap.data() as IAccount
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }

      throw new Error(JSON.stringify(error))
    }
  }

  static async fetchDebitAccount(accountId: string): Promise<IAccount[]> {
    try {
      const accountCol = collection(db, 'accounts', accountId)
      const q = query(accountCol, where('accountType', '==', 'debit'))
      const snap = await getDocs(q)

      if (!snap.docs.length || !snap) {
        throw new Error('Nenhuma conta encontrada!')
      }

      return snap.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        accountType: doc.data().accountType,
        createdAt: doc.data().createdAt,
        currentAmmount: doc.data().currentAmmount,
        updatedAt: doc.data().updatedAt,
        userId: doc.data().userId,
        statements: doc.data().statements,
      }))

    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(error.message)
      }

      if (error instanceof Error) {
        throw new Error(error.message)
      }

      throw error
    }
  }

  static async updateStatement(accountId: string, statement: CreateStatementDTO): Promise<IAccount> {
    try {
      const accountRef = doc(db, 'accounts', accountId)

      await updateDoc(accountRef, {
        statements: arrayUnion(statement),
        currentAmmount: increment(statement.value)
      })

      const snap = await getDoc(accountRef)

      if (!snap.exists()) {
        throw new Error('Conta não achada!!!')
      }

      return snap.data() as IAccount
    } catch (error) {
      console.log(error)
      throw new Error('Não rolou alguma coisa aqui!')
    }
  }
}
