import { AppHeader } from "@/shared/components/app-header/AppHeader";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { Text, View } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { HeaderGoBackButton } from "@/shared/components/header-go-back-button/HeaderGoBackButton";

export default function PixScreen() {
  const router = useRouter()
  const navigator = useNavigation()

  return (
    <BackgroundGradient>
      <AppHeader leftContent={<HeaderGoBackButton />} centerContent={<Text style={{ fontSize: 20, fontWeight: 600 }}>Pix</Text>} />
      <View>
        <Text>Pix</Text>
      </View>
    </BackgroundGradient>
  )
}
