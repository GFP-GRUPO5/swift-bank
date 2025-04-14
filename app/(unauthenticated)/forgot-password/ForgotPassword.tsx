import { SwiftBankLogo } from "@/domain/components/icons/swiftBankLogo";
import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { forgotPasswordStyles } from "./ForgotPassword.styles";
import { TextField } from "@/domain/components/atoms/text-field/TextField";
import { ButtonAction } from "@/domain/components/atoms/button-action/ButtonAction";
import { router } from "expo-router";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSend = () => {
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, insira um e-mail válido.");
      return;
    }
    router.push({
      pathname: "../verification-code/VerificationCode",
      params: { email }
    });
  };
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
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <ButtonAction style={forgotPasswordStyles.button} onPress={handleSend}>
        <Text style={forgotPasswordStyles.buttonText}>Enviar</Text>
      </ButtonAction>
      <Text style={forgotPasswordStyles.backToSignInText}>Lembrou sua senha?</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={forgotPasswordStyles.backToSignInLink}>Faça seu Login!</Text>
      </TouchableOpacity>
    </BackgroundGradient>
  )
}