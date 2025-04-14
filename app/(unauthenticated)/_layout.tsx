import { useAppSelector } from "@/redux/hooks";
import { Redirect, Stack } from "expo-router";

export default function UnauthenticatedLayout() {
  const { user } = useAppSelector(state => state.auth)

  if (user && Object.keys(user).length) {
    return <Redirect href="/(authenticated)/home/Home" />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-up/SignUp" />
      <Stack.Screen name="sign-in/SignIn" />
    </Stack>
  )
}
