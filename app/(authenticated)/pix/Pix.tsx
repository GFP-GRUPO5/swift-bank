import { AppHeader } from "@/domain/components/molecules/app-header/AppHeader";
import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient";
import { Text, View } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { HeaderGoBackButton } from "@/domain/components/atoms/header-go-back-button/HeaderGoBackButton";

export default function PixScreen() {
  const router = useRouter()
  const navigator = useNavigation()

  return (
    <BackgroundGradient>
      <AppHeader leftContent={<HeaderGoBackButton /> } centerContent={<Text style={{ fontSize: 20, fontWeight: 600 }}>Pix</Text>} />
      <View>
        <Text>Pix</Text>
      </View>
    </BackgroundGradient>
  )
}
