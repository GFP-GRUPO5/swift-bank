export interface SignInAppUser {
  uid: string | null
  email: string | null
  emailVerified: boolean | null
  displayName: string | null
  phoneNumber: string | null
  createdAt: string | null | undefined
  lastLoginAt: string | null | undefined
  accessTokenId: string | null | undefined
  refreshToken: string | null | undefined
  expirationTime: string | undefined
}

export interface AppUser {
  uid: string | null
  email: string | null
  emailVerified: boolean | null
  displayName: string | null
  phoneNumber: string | null
  createdAt: string | null | undefined
  lastLoginAt: string | null | undefined
}

export interface UpdateUserDTO {
  displayName?: string | null | undefined
  photoURL?: string | null | undefined
}