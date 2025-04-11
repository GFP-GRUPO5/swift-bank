import { auth, db } from "@/firebase/config"
import { SignInUserDTO } from "@/types/auth.types"
import { isRejectedWithValue } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth"
import { UserService } from "./user.services"
import { doc, setDoc } from "firebase/firestore"

interface CreateAuthUserDTO {
  email: string
  name: string
  lastName: string
  password: string
}

/**
 * @description AuthService
 * @static function login()
 * @static function signUp()
 * @static function refreshToken()
 * @static function logout()
 */
export class AuthService {
  static async signIn(loginData: SignInUserDTO) {
    try {
      const { email, password } = loginData
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      
      const result = await UserService.fetchUserById(user.uid)

      return result
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }

      throw new Error(JSON.stringify(error))
    }
  }

  static async signUp(data: CreateAuthUserDTO): Promise<void> {
    try {
      const { email, password, name, lastName } = data
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      const userRef = doc(db, 'users', user.uid)
      await setDoc(userRef, { email, name, lastName, id: user.uid })
      
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }

      throw new Error(JSON.stringify(error))
    }
  }

  static async refreshToken() {

  }

  static async logout() {

  }
}
