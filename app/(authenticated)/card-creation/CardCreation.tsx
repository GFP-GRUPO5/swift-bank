import { HeaderGoBackButton } from "@/domain/components/atoms/header-go-back-button/HeaderGoBackButton";
import { AppHeader } from "@/domain/components/molecules/app-header/AppHeader";
import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient";
import { Text, View } from "react-native";

export default function CardCreation() {
  return (
    <BackgroundGradient>
      <AppHeader
        style={{ paddingTop: 16, borderBottomWidth: 1 }}
        leftContent={<HeaderGoBackButton isModal />}
        centerContent='Novo Cartão'
      />
      <View>
        <Text>Card Creation</Text>
      </View>
    </BackgroundGradient>
  )
}
