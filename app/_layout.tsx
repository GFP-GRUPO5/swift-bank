import StoreProvider from "@/redux/StoreProvider";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <StoreProvider>
      <Slot />
    </StoreProvider>
  )
}
