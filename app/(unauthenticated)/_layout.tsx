import { useAppSelector } from "@/redux/hooks";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function UnauthenticatedLayout() {
  const { user } = useAppSelector(state => state.auth)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useEffect(() => {
    if (user) {
      setIsUserLoggedIn(true)
    } else {
      setIsUserLoggedIn(false)
    }
  }, [user])

  console.log(user)

  if (isUserLoggedIn) {
    return <Redirect href="/(authenticated)/home/Home" />
  }


  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-up/SignUp" />
      <Stack.Screen name="sign-in/SignIn" />
    </Stack>
  )
}
