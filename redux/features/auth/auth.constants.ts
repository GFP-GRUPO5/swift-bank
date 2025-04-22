import { AppUser } from "@/domains/authentication/types/user"


interface ErrorMetadata {
  hasError: boolean | null
  details: any | null
  message: string | null
}

interface Metadata {
  isFufilled: boolean | null,
  loading: boolean,
  error: ErrorMetadata | null
}

interface IInitialState {
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
}

export const initialState: IInitialState = {
  credentials: {
    accessTokenId: null,
    refreshToken: null,
    expiresIn: null
  },
  user: undefined,
  signInMetadata: {
    isFufilled: null,
    loading: false,
    error: null,
  },
  signOutMetadata: {
    isFufilled: null,
    loading: false,
    error: null,
  },
  signUpMetadata: {
    isFufilled: null,
    loading: false,
    error: null,
  },
  updatePasswordMetadata: {
    isFufilled: null,
    loading: false,
    error: null,
  },
  changePasswordMetadata: {
    isFufilled: null,
    loading: false,
    error: null,
  }
}
