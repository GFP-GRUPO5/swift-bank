import { Text, View } from "react-native";
import { TextField } from "@/shared/components/text-field/TextField";
import { ButtonAction } from "@/shared/components/button-action/ButtonAction";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { verificationCodeStyles } from "@/domains/authentication/styles/VerificationCode.styles";
import { UnauthenticatedWrapper } from "@/domains/authentication/components/unauthenticated-wrapper/UnauthenticatedWrapper";

export default function VerificationCode() {

  const router = useRouter();
  const [code, setCode] = useState("");

  const handleVerify = () => {
    if (code.trim() !== "") {
      router.push("../change-password/ChangePassword");
    }
  }

  return (
    <UnauthenticatedWrapper
      title="Código de verificação"
      subtitle="Digite o código de verificação que enviamos no seu e-mail."
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ backgroundColor: 'transparent' }}>
        <View style={{ marginBottom: 16 }}>
          <Text style={verificationCodeStyles.label}>Insira o código de verificação</Text>
          <TextField
            placeholder="Código de verificação"
            autoCapitalize="none"
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
          />
        </View>
        <ButtonAction style={verificationCodeStyles.button} onPress={handleVerify}>
          <Text style={verificationCodeStyles.buttonText}>Verificar</Text>
        </ButtonAction>
      </View>
    </UnauthenticatedWrapper>
  )
}