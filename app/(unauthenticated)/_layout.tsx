import { Stack } from "expo-router";

export default function SignUpLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-up/SignUp" />
      <Stack.Screen name="sign-in/SignIn" />
    </Stack>
  )
}
