export interface AppUser {
  uid: string | null
  email: string | null
  emailVerified: boolean | null
  displayName: string | null
  phoneNumber: string | null
  createdAt: string | null | undefined
  lastLoginAt: string | null | undefined
}
