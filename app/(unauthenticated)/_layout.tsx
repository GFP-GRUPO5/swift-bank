import { useAppSelector } from "@/redux/hooks";
import { Redirect, Stack } from "expo-router";

export default function SignUpLayout() {
  const { user } = useAppSelector(state => state.auth)

  console.log(user)

  if (Object.keys(user).length) {
    return <Redirect href="/(authenticated)/home/Home" />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-up/SignUp" />
      <Stack.Screen name="sign-in/SignIn" />
    </Stack>
  )
}
