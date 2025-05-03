import { UnauthenticatedWrapper } from "@/domains/authentication/components/unauthenticated-wrapper/UnauthenticatedWrapper"
import { forgotPasswordStyles } from "@/domains/authentication/styles/ForgotPassword.styles"
import { auth } from "@/firebase/config"
import { ButtonAction } from "@/shared/components/button-action/ButtonAction"
import { TextField } from "@/shared/components/text-field/TextField"
import { router, Stack } from "expo-router"
import { sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { Alert, Text, TouchableOpacity, View } from "react-native"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")

  const handleSend = async () => {
    const emailTrimmed = email.trim().toLowerCase()
    if (!emailTrimmed) {
      Alert.alert("Erro", "Por favor, insira um e-mail válido.")
      return
    }

    try {
      await sendPasswordResetEmail(auth, emailTrimmed)
      Alert.alert(
        "Email enviado!",
        "Verifique sua caixa de entrada para redefinir sua senha."
      )
      router.push("/(unauthenticated)/sign-in/SignIn")
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível enviar o e-mail. Tente novamente.")
      console.error(error)
    }
  }

  return (
    <UnauthenticatedWrapper
      title="Esqueceu sua senha?"
      subtitle="Enviaremos um e-mail com instruções de como redefinir sua senha."
    >
      <Stack.Screen options={{ headerShown: false }} />
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