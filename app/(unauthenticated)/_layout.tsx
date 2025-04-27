import { useAppSelector } from "@/redux/hooks";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function UnauthenticatedLayout() {
  const { user } = useAppSelector(state => state.auth)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useEffect(() => {
    if (!user?.emailVerified && process.env.NODE_ENV === 'production') {
      Alert.alert(
        'Email não verificado!',
        'Verifique seu email para confirmar a conta.',
      )
      return
    }


    setIsUserLoggedIn(!!user?.email)
  }, [user])

  if (isUserLoggedIn) {
    return <Redirect href="/(authenticated)" />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-up/SignUp" />
      <Stack.Screen name="sign-in/SignIn" />
      <Stack.Screen name="(forgot-password)/" />
      <Stack.Screen name="(forgot-password)/change-password/ChangePassword" />
      <Stack.Screen name="(forgot-password)/verification-code/VerificationCode" />
    </Stack>
  )
}
