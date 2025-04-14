import { SwiftBankLogo } from "@/domain/components/icons/swiftBankLogo";
import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient";
import { Text, View } from "react-native";
import { verificationCodeStyles } from "./VerificationCode.styles";
import { TextField } from "@/domain/components/atoms/text-field/TextField";
import { ButtonAction } from "@/domain/components/atoms/button-action/ButtonAction";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function VerificationCode() {

  const router = useRouter();
  const [code, setCode] = useState("");

  const handleVerify = () => {
    if (code.trim() !== "") {
      router.push("../change-password/ChangePassword");
    }
  }

  return (
    <BackgroundGradient style={{ flex: 1 }}>
      <View style={verificationCodeStyles.logo}>
        <SwiftBankLogo />
      </View>
      <Text style={verificationCodeStyles.title}>Código de verificação</Text>
      <Text style={verificationCodeStyles.subtitle}>Digite o código de verificação que enviamos no seu e-mail.</Text>
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
    </BackgroundGradient>
  )
}