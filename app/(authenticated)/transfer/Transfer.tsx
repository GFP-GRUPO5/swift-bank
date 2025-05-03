import { AppHeader } from "@/shared/components/app-header/AppHeader";
import { HeaderGoBackButton } from "@/shared/components/header-go-back-button/HeaderGoBackButton";
import { IconSwiftBankLogo } from "@/shared/icons/IconSwiftBankLogo";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { Text, View } from "react-native";

export default function Transfer() {
  return (
    <BackgroundGradient>
      <AppHeader
        style={{ paddingTop: 16, borderBottomWidth: 1 }}
        leftContent={<HeaderGoBackButton isModal />}
        rigthContent={<IconSwiftBankLogo />}
      />
      <View>
        <Text>Transferência</Text>
      </View>
    </BackgroundGradient>
  )
}
