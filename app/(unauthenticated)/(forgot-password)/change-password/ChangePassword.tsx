import { Alert, Text, View, Pressable } from "react-native";
import { TextField } from "@/shared/components/text-field/TextField";
import { ButtonAction } from "@/shared/components/button-action/ButtonAction";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { changePasswordStyles } from "@/domains/authentication/styles/ChangePassword.styles";
import { UnauthenticatedWrapper } from "@/domains/authentication/components/unauthenticated-wrapper/UnauthenticatedWrapper";

export default function VerificationCode() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleChangePassword = () => {
    if (password === "" || confirmPassword === "") {
      Alert.alert("Por favor, preencha todos os campos!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("As senhas não coincidem!");
      return;
    }

    Alert.alert("Sucesso", "Senha alterada com sucesso!", [
      {
        text: "OK",
        onPress: () => router.dismissTo('/(unauthenticated)/sign-in/SignIn'),
      },
    ]);
  };

  return (
    <UnauthenticatedWrapper
      title="Altere a sua Senha"
      subtitle="Digite sua nova senha"
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ marginBottom: 16 }}>
        <Text style={changePasswordStyles.label}>Senha</Text>
        <View style={changePasswordStyles.passwordContainer}>
          <TextField
            placeholder="Insira a senha"
            autoCapitalize="none"
            secureTextEntry={!isVisible}
            value={password}
            onChangeText={setPassword}
            style={{ paddingRight: 56 }}
          />
          <Pressable
            style={changePasswordStyles.eyeIcon}
            onPress={() => setIsVisible((prev) => !prev)}
          >
            {isVisible ? (
              <Entypo name="eye-with-line" size={24} color="black" />
            ) : (
              <Entypo name="eye" size={24} color="black" />
            )}
          </Pressable>
        </View>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={changePasswordStyles.label}>Confirmação de senha</Text>
        <View style={changePasswordStyles.passwordContainer}>
          <TextField
            placeholder="Confirme sua senha"
            autoCapitalize="none"
            secureTextEntry={!isVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={{ paddingRight: 56 }}
          />
          <Pressable
            style={changePasswordStyles.eyeIcon}
            onPress={() => setIsVisible((prev) => !prev)}
          >
            {isVisible ? (
              <Entypo name="eye-with-line" size={24} color="black" />
            ) : (
              <Entypo name="eye" size={24} color="black" />
            )}
          </Pressable>
        </View>
      </View>
      <ButtonAction style={changePasswordStyles.button} onPress={handleChangePassword}>
        <Text style={changePasswordStyles.buttonText}>Alterar</Text>
      </ButtonAction>
    </UnauthenticatedWrapper>
  );
}
