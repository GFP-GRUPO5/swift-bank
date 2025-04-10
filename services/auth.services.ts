import { auth } from "@/firebase/config"
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth"

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
  static async login() {

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
    } catch (error: unknown) {

      console.log(error)

      if (error instanceof Error) {
        throw new Error(error.message)
      }

    }
  }

  static async refreshToken() {

  }

  static async logout() {

  }
}
