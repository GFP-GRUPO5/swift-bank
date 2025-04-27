import { IAuthInitialState } from "./auth.types";

export const authInitialState: IAuthInitialState = {
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
  },
  updateUserProfile: {
    isFufilled: null,
    loading: false,
    error: null,
  }
}
