import { HeaderGoBackButton } from "@/domain/components/atoms/header-go-back-button/HeaderGoBackButton";
import { AppHeader } from "@/domain/components/molecules/app-header/AppHeader";
import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient";
import { Text, View } from "react-native";

export default function QRCodeScreen() {
  return (
    <BackgroundGradient>
      <AppHeader leftContent={<HeaderGoBackButton /> } centerContent='QR Code'/>
      <View>
        <Text>QR Code</Text>
      </View>
    </BackgroundGradient>
  )
}
