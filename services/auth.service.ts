import { auth } from "@/firebase/config"
import { SignInUserDTO } from "@/domain/types/auth.types"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as logOut,
  UserCredential,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth"
import { UserService } from "./user.services"
import { AccountService } from "./account.service"
import { clearAsyncStorage, setItemAsyncStorage } from "@/utils/AsyncStorage"
import { USER_DATA_KEY } from "@/domain/constants/async-storage-user"
import { FirebaseError } from "firebase/app"

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

      if (!user) {
        throw new Error('Credenciais incorretas, email ou senha não correspondem.')
      }

      const createdUser = await UserService.fetchUserById(user.uid)

      if (!createdUser) {
        throw new Error('Usuário não encontrado')
      }

      return createdUser
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

      await UserService.createUser({ id: user.uid, email, lastName, name })
      await AccountService.createAccount(user.uid)

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }

      throw new Error(JSON.stringify(error))
    }
  }

  static async refreshToken() {

  }

  static async signOut() {
    try {
      clearAsyncStorage(USER_DATA_KEY)
      await logOut(auth)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error(JSON.stringify(error))
    }
  }

  static async updatePassword(currentPassword: string, newPassword: string) {
    try {
      const user = auth.currentUser

      if (!user || !user.email) {
        throw new Error('Usuário não encontrado!')
      }

      const credential = EmailAuthProvider.credential(user.email, currentPassword)

      const cred2 = await reauthenticateWithCredential(user, credential)
      console.log(cred2)
      await updatePassword(user, newPassword)
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/requires-recent-login') {
          console.error('Please reauthenticate and try again.');
        } else {
          console.error('Error updating password:', error.message);
        }
      }
      throw error;
    }
  }
}
