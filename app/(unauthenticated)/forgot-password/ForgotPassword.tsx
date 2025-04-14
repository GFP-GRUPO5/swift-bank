import { SwiftBankLogo } from "@/domain/components/icons/swiftBankLogo";
import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient";
import { Text, TouchableOpacity, View } from "react-native";
import { forgotPasswordStyles } from "./ForgotPassword.styles";
import { TextField } from "@/domain/components/atoms/text-field/TextField";
import { ButtonAction } from "@/domain/components/atoms/button-action/ButtonAction";
import { useNavigation } from "expo-router";

export default function ForgotPassword() {
  const navigation = useNavigation()
  return (
    <BackgroundGradient style={{ flex: 1 }}>
      <View style={forgotPasswordStyles.logo}>
        <SwiftBankLogo />
      </View>
      <Text style={forgotPasswordStyles.title}>Esqueceu sua senha?</Text>
      <Text style={forgotPasswordStyles.subtitle}>Enviaremos um e-mail com instruções de como redefinir sua senha.</Text>
      <View style={{ marginBottom: 16 }}>
        <Text style={forgotPasswordStyles.label}>Insira seu email</Text>
        <TextField
          placeholder="E-mail"
          autoCapitalize="none"
        />
      </View>
      <ButtonAction style={forgotPasswordStyles.button}>
        <Text style={forgotPasswordStyles.buttonText}>Enviar</Text>
      </ButtonAction>
      <Text style={forgotPasswordStyles.backToSignInText}>Lembrou sua senha?</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={forgotPasswordStyles.backToSignInLink}>Faça seu Login!</Text>
      </TouchableOpacity>
    </BackgroundGradient>
  )
}