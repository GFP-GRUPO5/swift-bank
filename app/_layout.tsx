import { AuthSync } from "@/modules/authentication/presentation/components/auth-sync/AuthSync";
import StoreProvider from "@/shared/redux/StoreProvider";
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
