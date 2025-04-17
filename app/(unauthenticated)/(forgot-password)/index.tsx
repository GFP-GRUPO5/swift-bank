import { Alert, Text, TouchableOpacity, View } from "react-native"
import { forgotPasswordStyles } from "../../../styles/ForgotPassword.styles"
import { TextField } from "@/domain/components/atoms/text-field/TextField"
import { ButtonAction } from "@/domain/components/atoms/button-action/ButtonAction"
import { router } from "expo-router"
import { useState } from "react"
import { UnauthenticatedWrapper } from "@/domain/components/templates/unauthenticated-wrapper/UnauthenticatedWrapper"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")

  const handleSend = () => {
    if (!email.trim().toLowerCase()) {
      Alert.alert("Erro", "Por favor, insira um e-mail válido.")
      return
    }
    router.push({
      pathname: "/(unauthenticated)/(forgot-password)/verification-code/VerificationCode",
      params: { email: email.trim().toLowerCase() },
    })
  }

  return (
    <UnauthenticatedWrapper
      title="Esqueceu sua senha?"
      subtitle="Enviaremos um e-mail com instruções de como redefinir sua senha."
    >
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
    </UnauthenticatedWrapper>
  )
}