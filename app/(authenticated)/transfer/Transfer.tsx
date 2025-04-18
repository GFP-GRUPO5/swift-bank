import { HeaderGoBackButton } from "@/shared/components/header-go-back-button/HeaderGoBackButton";
import { AppHeader } from "@/shared/components/app-header/AppHeader";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { Text, View } from "react-native";

export default function Transfer() {
  return (
    <BackgroundGradient>
      <AppHeader leftContent={<HeaderGoBackButton />} centerContent='Transferência' />
      <View>
        <Text>Transferência</Text>
      </View>
    </BackgroundGradient>
  )
}
