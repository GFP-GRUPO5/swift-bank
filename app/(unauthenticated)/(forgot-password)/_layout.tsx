import { SwiftBankLogo } from "@/domain/components/icons/swiftBankLogo"
import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient"
import { forgotPasswordStyles } from "@/styles/ForgotPassword.styles"
import { Slot, Stack } from "expo-router"
import { ReactNode } from "react"
import { View } from "react-native"
import ForgotPassword from "."

export default function ForgotPasswordRootLayout() {
  return (
    <Stack>
      <Stack.Screen name="/forgot-password/ForgotPassword" options={{ headerShown: false }} />
      <Stack.Screen
        name="/verification-code/VerificationCode"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="/change-password/ChangePassword" />
    </Stack>
  )
}
