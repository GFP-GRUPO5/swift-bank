import { UnauthenticatedWrapper } from "@/domains/authentication/components/unauthenticated-wrapper/UnauthenticatedWrapper"
import { forgotPasswordStyles } from "@/domains/authentication/styles/ForgotPassword.styles"
import { sendForgotPasswordEmail } from "@/redux/features/auth/thunks/forgot-passwordf"
import { useAppDispatch } from "@/redux/hooks"
import { ButtonAction } from "@/shared/components/button-action/ButtonAction"
import { TextField } from "@/shared/components/text-field/TextField"
import { router, Stack } from "expo-router"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const dispatch = useAppDispatch()

   async function handleSendNewPassword() {
    dispatch(sendForgotPasswordEmail({ email }))
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
      <ButtonAction style={forgotPasswordStyles.button} onPress={handleSendNewPassword}>
        <Text style={forgotPasswordStyles.buttonText}>Enviar</Text>
      </ButtonAction>
      <Text style={forgotPasswordStyles.backToSignInText}>Lembrou sua senha?</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={forgotPasswordStyles.backToSignInLink}>Faça seu Login!</Text>
      </TouchableOpacity>
    </UnauthenticatedWrapper>
  )
}
