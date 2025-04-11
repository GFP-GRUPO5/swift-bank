import { Stack } from "expo-router";

export default function AuthenticatedRootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home/Home"  />
    </Stack>
  )
}
