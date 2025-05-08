import { AppUser } from "@/domains/authentication/types/user"

interface ErrorMetadata {
  hasError: boolean | null
  message: string | null
}

interface Metadata {
  isFufilled: boolean | null,
  loading: boolean,
  error: ErrorMetadata | null
}

export interface IAuthInitialState {
  credentials: {
    accessTokenId: string | null
    refreshToken: string | null
    expiresIn: string | null
  },
  user: AppUser | undefined | null
  signInMetadata: Metadata
  signUpMetadata: Metadata
  signOutMetadata: Metadata
  updatePasswordMetadata: Metadata
  changePasswordMetadata: Metadata
  updateUserProfile: Metadata
  forgotPassword: Metadata
}
