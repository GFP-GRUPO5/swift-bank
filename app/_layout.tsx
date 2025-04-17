import StoreProvider from "@/redux/StoreProvider";
import { AuthSync } from "@/shared/components/auth-sync/AuthSync";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <StoreProvider>
        <AuthSync>
          <Slot />
        </AuthSync>
      </StoreProvider>
    </GestureHandlerRootView>
  )
}
