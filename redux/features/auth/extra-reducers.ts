import { SignInAppUser } from "@/domains/authentication/types/user"
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit"
import { Alert } from "react-native"
import { IAuthInitialState } from "./auth.types"
import { changePassword } from "./thunks/change-password"
import { sendForgotPasswordEmail } from "./thunks/forgot-passwordf"
import { signInUserWithEmail } from "./thunks/sign-in"
import { signOutUser } from "./thunks/sign-out"
import { signUpUserWithEmail } from "./thunks/sign-up"
import { updateUserProfile } from "./thunks/update-user-profile"

export function authExtraReducers(builder: ActionReducerMapBuilder<IAuthInitialState>) {
  builder
    // Sign Up Flow
    .addCase(signUpUserWithEmail.pending, (state) => {
      state.signUpMetadata.loading = true
      state.signUpMetadata.error = null
    })
    .addCase(signUpUserWithEmail.fulfilled, (state) => {
      state.signUpMetadata.isFufilled = true
      state.signUpMetadata.loading = false
    })
    .addCase(signUpUserWithEmail.rejected, (state, { payload }) => {
      state.signUpMetadata.isFufilled = true
      state.signUpMetadata.loading = false
      state.signUpMetadata.error = {
        hasError: true,
        message: payload as string
      }
    })
    // Sign In Flow
    .addCase(signInUserWithEmail.pending, (state) => {
      state.signInMetadata.loading = true
      state.signInMetadata.error = null
    })
    .addCase(signInUserWithEmail.fulfilled, (state, { payload }: PayloadAction<SignInAppUser | undefined>) => {
      state.signInMetadata.loading = false
      state.signInMetadata.isFufilled = true
      state.user = {
        uid: payload?.uid ?? '',
        email: payload?.email ?? '',
        emailVerified: !!payload?.emailVerified,
        displayName: payload?.displayName ?? '',
        phoneNumber: payload?.phoneNumber ?? '',
        createdAt: payload?.createdAt,
        lastLoginAt: payload?.lastLoginAt,
      }

      state.credentials = {
        accessTokenId: payload?.accessTokenId ?? '',
        refreshToken: payload?.refreshToken ?? '',
        expiresIn: `${payload?.expirationTime}`
      }

    })
    .addCase(signInUserWithEmail.rejected, (state, { payload }) => {
      state.signInMetadata.loading = false
      state.signInMetadata.isFufilled = false
      state.signInMetadata.error = {
        hasError: true,
        message: payload as string
      }
    })
    // Sign Out Flow
    .addCase(signOutUser.pending, (state) => {
      state.signOutMetadata.loading = true
    })
    .addCase(signOutUser.fulfilled, (state) => {
      state.signOutMetadata.isFufilled = true
      state.signOutMetadata.loading = false
      state.user = undefined
    })
    .addCase(signOutUser.rejected, (state, { payload }) => {
      state.signOutMetadata.isFufilled = true
      state.signOutMetadata.loading = false
      state.signOutMetadata.error = {
        hasError: true,
        message: payload as string
      }
    })
    // Change Password Flow
    .addCase(changePassword.pending, (state) => {
      state.changePasswordMetadata.error = null
      state.changePasswordMetadata.loading = true
      state.changePasswordMetadata.isFufilled = false
    })
    .addCase(changePassword.fulfilled, (state) => {
      state.changePasswordMetadata.loading = false
      state.changePasswordMetadata.isFufilled = true
      state.changePasswordMetadata.error = null
      Alert.alert('Sucesso', 'Senha alterada com sucesso')
    })
    .addCase(changePassword.rejected, (state, { payload }) => {
      state.changePasswordMetadata.isFufilled = true
      state.changePasswordMetadata.loading = false
      state.changePasswordMetadata.error = {
        hasError: true,
        message: payload as string
      }
      Alert.alert('Erro', JSON.stringify(payload))
    })
    // Update User Profile
    .addCase(updateUserProfile.pending, (state) => {
      state.updateUserProfile.loading = true
      state.updateUserProfile.isFufilled = false
    })
    .addCase(updateUserProfile.fulfilled, (state, { payload }: PayloadAction<SignInAppUser>) => {
      state.updateUserProfile.loading = false
      state.updateUserProfile.isFufilled = true
      state.user = {
        uid: payload?.uid,
        email: payload?.email,
        emailVerified: !!payload?.emailVerified,
        displayName: payload?.displayName,
        phoneNumber: payload?.phoneNumber,
        createdAt: payload?.createdAt,
        lastLoginAt: payload?.lastLoginAt,
      }
      state.credentials = {
        accessTokenId: payload?.accessTokenId!,
        refreshToken: payload?.refreshToken!,
        expiresIn: payload?.expirationTime!,
      }
    })
    .addCase(updateUserProfile.rejected, (state, { payload }) => {
      state.updateUserProfile.loading = false
      state.updateUserProfile.isFufilled = false
      state.updateUserProfile.error = {
        hasError: true,
        message: payload as string
      }
    })
    //FORGOT PASSWORD
    .addCase(sendForgotPasswordEmail.pending, (state) => {
      state.forgotPassword.loading = true
      state.forgotPassword.error = null
      state.forgotPassword.isFufilled = false
    })
    .addCase(sendForgotPasswordEmail.fulfilled, (state) => {
      state.forgotPassword.loading = false
      state.forgotPassword.error = null
      state.forgotPassword.isFufilled = true
    })
    .addCase(sendForgotPasswordEmail.rejected, (state, { payload }) => {
      state.forgotPassword.loading = false
      state.forgotPassword.error = {
        hasError: true,
        message: `${payload}`,
      }
      state.forgotPassword.isFufilled = true
    })

}
