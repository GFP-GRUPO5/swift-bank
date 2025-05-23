import { AccountService } from "@/domains/account/services/account.service"
import { SignInAppUser, UpdateUserDTO } from "@/domains/authentication/types/user"
import { UsersService } from "@/domains/users/services/users.service"
import { auth } from "@/firebase/config"
import { getFirebaseErrorMessage } from "@/shared/utils/firebase-error-handler"
import { FirebaseError } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  signOut as logOut,
  onAuthStateChanged,
  reauthenticateWithCredential,
  reload,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
  User
} from "firebase/auth"

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

      await AccountService.createAccount(user.uid)
      await UsersService.createUser({ id: user.uid, name, email })

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
    if (!currentPassword || !newPassword) {
      throw new Error('Você precisa preencher a senha atual e a nova senha!')
    }

    const user = auth.currentUser

    if (!user) {
      throw new Error('Usuário não encontrado!')
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email || '',
        currentPassword
      )

      await reauthenticateWithCredential(user, credential)
    } catch (error) {
      if (error instanceof FirebaseError) {
        const message = getFirebaseErrorMessage(error)
        throw new Error(message)
      }
      throw JSON.stringify(error)
    }

    try {
      if (!user || !user.email) {
        throw new Error('Usuário não encontrado!')
      }

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

  static async forgotPassword(email: string) {
    const emailTrimmed = email.trim().toLowerCase()

    if (!emailTrimmed) {
      throw new Error('Por favor, insira um e-mail válido.')
      return
    }

    try {
      await sendPasswordResetEmail(auth, emailTrimmed)
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(error.message)
      }

      if (error instanceof Error) {
        throw new Error(error.message)
      }

      throw new Error(JSON.stringify(error))
    }
  }
}
