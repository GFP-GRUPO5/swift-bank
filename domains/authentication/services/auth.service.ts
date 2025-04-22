import { auth } from "@/firebase/config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as logOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  User,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
  reload
} from "firebase/auth"
import { FirebaseError } from "firebase/app"
import { SignInAppUser, UpdateUserDTO } from "@/domains/authentication/types/user"
import { AccountService } from "@/domains/account/services/account.service"

interface CreateAuthUserDTO {
  email: string
  name: string
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
  static async signIn(email: string, password: string): Promise<SignInAppUser> {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)

      const tokenResult = (await user.getIdTokenResult())

      return {
        uid: user.uid,
        displayName: user.displayName,
        createdAt: user.metadata.creationTime,
        email: user.email,
        emailVerified: user.emailVerified,
        lastLoginAt: user.metadata.lastSignInTime,
        phoneNumber: user.phoneNumber,
        accessTokenId: await user.getIdToken(),
        refreshToken: user.refreshToken,
        expirationTime: tokenResult.expirationTime,
      }
    } catch (error) {
      console.log(error)
      if (error instanceof FirebaseError) {
        throw error
      }
      throw error
    }
  }

  static async signUp(data: CreateAuthUserDTO): Promise<void> {
    try {
      const { email, password, name } = data
      const { user } = await createUserWithEmailAndPassword(auth, email, password)

      AccountService.createAccount(user.uid)

      sendEmailVerification(user, {
        url: 'https://your-app.com/finishSignUp',
        handleCodeInApp: true,
        iOS: { bundleId: 'com.yourcompany.yourapp' },
        android: {
          packageName: 'com.yourcompany.yourapp',
          installApp: true,
          minimumVersion: '12',
        },
        dynamicLinkDomain: 'yourapp.page.link',
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }

      throw new Error(JSON.stringify(error))
    }
  }

  static async signOut() {
    try {
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

  static async onAuthStateChange(callback: (user: User | null) => void) {
    try {
      return onAuthStateChanged(auth, callback)
    } catch (error) {
      throw error
    }
  }

  static async getCurrentUser() {
    return auth.currentUser
  }

  static async updateUserProfile(userData: UpdateUserDTO): Promise<SignInAppUser> {
    try {
      const user = auth.currentUser

      if (!user) {
        throw Error('Usuário não encontrado.')
      }

      await updateProfile(user, { ...userData })
      await reload(user)

      if (!auth.currentUser) {
        throw new Error('Usuário não encontrado!')
      }

      const newUser = auth.currentUser
      const tokenResult = (await newUser.getIdTokenResult())

      return {
        uid: newUser.uid,
        displayName: newUser.displayName,
        createdAt: newUser.metadata.creationTime,
        email: newUser.email,
        emailVerified: newUser.emailVerified,
        lastLoginAt: newUser.metadata.lastSignInTime,
        phoneNumber: newUser.phoneNumber,
        accessTokenId: await newUser.getIdToken(),
        refreshToken: newUser.refreshToken,
        expirationTime: tokenResult.expirationTime,
      }
    } catch (error) {
      throw error
    }
  }

  static async isTokenExpired(): Promise<boolean> {
    const user = auth.currentUser

    if (!user) return false

    const { expirationTime } = await user.getIdTokenResult()
    const expiresAt = new Date(expirationTime).getTime()

    return Date.now() >= expiresAt
  }
}
