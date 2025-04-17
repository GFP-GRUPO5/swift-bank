import { AppUser } from "@/domain/types/user"
import { User } from "firebase/auth"

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
    accessToken: string | null
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
    accessToken: null
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
