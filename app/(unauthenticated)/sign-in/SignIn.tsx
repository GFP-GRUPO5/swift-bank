import { SwiftBankLogo } from "@/components/icons/swiftBankLogo";
import { BackgroundGradient } from "@/components/templates/background-gradient/BackgroundGradient";
import { View } from "react-native";
import { Text } from "react-native-svg";

export default function SignInScreen() {
  return (
    <BackgroundGradient>
      <SwiftBankLogo />
      <View>
        <Text>Login</Text>
      </View>
      <View>
        <Text>Boas-Vindas</Text>
      </View>
    </BackgroundGradient>
  );
}
