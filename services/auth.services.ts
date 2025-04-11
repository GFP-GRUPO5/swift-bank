import { auth } from "@/firebase/config"
import { SignInUserDTO } from "@/types/auth.types"
import { isRejectedWithValue } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth"

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
  static async signIn(data: SignInUserDTO) {
    try {
      const { email, password } = data
      const result = await signInWithEmailAndPassword(auth, email, password)
      return {
        uid: result.user.uid,
        email: result.user.email,
        refreshToken: result.user.refreshToken,
      }
    } catch(error) {
      console.log(error)
      return isRejectedWithValue(error)
    }
  }

  static async signUp(data: CreateAuthUserDTO): Promise<(UserCredential & { name: string; lastName: string }) | undefined> {
    try {
      const { email, password, name, lastName } = data
      const credentials = await createUserWithEmailAndPassword(auth, email, password)

      return {
        ...credentials,
        name,
        lastName,
      }
    } catch (error) {
      isRejectedWithValue(error)
    }
  }

  static async refreshToken() {

  }

  static async logout() {

  }
}
