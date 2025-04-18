import { HeaderGoBackButton } from "@/shared/components/header-go-back-button/HeaderGoBackButton";
import { AppHeader } from "@/shared/components/app-header/AppHeader";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { Text, View } from "react-native";

export default function NotificationsScreen() {
  return (
    <BackgroundGradient>
      <AppHeader
        style={{ paddingTop: 16, borderBottomWidth: 1 }}
        leftContent={<HeaderGoBackButton label="Home" isModal />}
      />
      <Text>Notifications</Text>
    </BackgroundGradient>
  )
}
