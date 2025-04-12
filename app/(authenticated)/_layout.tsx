import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function AuthenticatedRootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home/Home" options={{ headerShown: false}} />
      <Stack.Screen name="account/Account" />
      <Stack.Screen name="notifications/Notifications" />
      <Stack.Screen name="pix/Pix" />
      <Stack.Screen name="qr-code/QRCode" />
      <Stack.Screen name="recharge/Recharge" />
      <Stack.Screen name="transfer/Transfer" />
      <Stack.Screen name="card-creation/CardCreation" options={{ presentation: 'modal' }} />
      <Stack.Screen name="loans/Loans" />
    </Stack>
  )
}
