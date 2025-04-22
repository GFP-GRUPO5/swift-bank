import { Stack } from "expo-router"

export default function ForgotPasswordRootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="/forgot-password/ForgotPassword"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="/verification-code/VerificationCode"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="/change-password/ChangePassword" />
    </Stack>
  )
}
