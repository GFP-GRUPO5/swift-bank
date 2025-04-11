import { HeaderGoBackButton } from "@/domain/components/atoms/header-go-back-button/HeaderGoBackButton";
import { AppHeader } from "@/domain/components/molecules/app-header/AppHeader";
import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient";
import { Text, View } from "react-native";

export default function RechargeScreen() {
  return (
    <BackgroundGradient>
      <AppHeader leftContent={<HeaderGoBackButton /> } centerContent='Recarga'/>
      <View>
        <Text>Recarga</Text>
      </View>
    </BackgroundGradient>
  )
}
