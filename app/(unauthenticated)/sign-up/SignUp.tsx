import { CreateAuthUserDTO } from "@/domain/types/auth.types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";

import Checkbox from "expo-checkbox";

import { ButtonAction } from "@/domain/components/atoms/button-action/ButtonAction";
import { TextField } from "@/domain/components/atoms/text-field/TextField";
import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient";
import { Link } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "./SigUp.styles"; // Importando os estilos
import { signUpUserWithEmail } from "@/redux/features/auth/thunks/sign-up";

const initialState: CreateAuthUserDTO = {
  name: "",
  lastName: "",
  email: "",
  password: "",
};

export default function SignUp() {
  const [isChecked, setChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    nome: "",
    password: "",
    passwordConfirmed: "",
  });

  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.auth);

  function handleTextChange(
    inputName: "nome" | "email" | "password" | "passwordConfirmed",
    text: string,
  ) {
    setUserCredentials((state) => ({
      ...state,
      [inputName]: text,
    }));
  }

  function handleSignUp() {
    const { nome, email, password, passwordConfirmed } = userCredentials;
    const policy = isChecked;

    if (!policy) {
      Alert.alert('Para usar nossos serviços você precisar concordar com nossas políticas.')
      return
    }

    if (password !== passwordConfirmed) {
      Alert.alert('As senhas não coincidem')
      return
    }

    const names = nome.split(' ')

    dispatch(signUpUserWithEmail({ email, password, name: names[0], lastName: names[1] }))
  }

  return (
    <BackgroundGradient style={styles.container}>
      <ScrollView scrollEnabled>
        <Text style={styles.title}>
          Swift <Text style={{ fontWeight: 300 }}>Bank</Text>
        </Text>

        <Text style={styles.subtitle}>Cadastro</Text>

        <Text style={styles.welcomeText}>
          Boas-Vindas! Preencha seus dados para criar sua conta.
        </Text>

        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>Nome</Text>
          <TextField
            placeholder="Insira seu nome completo"
            onChangeText={(nome) => handleTextChange("nome", nome)}
            value={userCredentials.nome}
            autoCapitalize="words"
          />
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>Insira seu email</Text>
          <TextField
            placeholder="E-mail"
            onChangeText={(email) => handleTextChange("email", email)}
            value={userCredentials.email}
            autoCapitalize="none"
          />
        </View>

        <View>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextField
              placeholder="***********"
              secureTextEntry={isVisible}
              style={{ paddingRight: 56 }}
              onChangeText={(password) =>
                handleTextChange("password", password)
              }
              value={userCredentials.password}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>Confirme sua senha</Text>
          <View style={styles.passwordConfirmedContainer}>
            <TextField
              placeholder="***********"
              secureTextEntry={isVisible}
              style={{ paddingRight: 56 }}
              onChangeText={(passwordConfirmed) =>
                handleTextChange("passwordConfirmed", passwordConfirmed)
              }
              value={userCredentials.passwordConfirmed}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.policyContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
          />
          <Text style={styles.policyText}>
            Li e estou ciente quanto a Politica e Privacidade.
          </Text>
        </View>

        <ButtonAction
          style={styles.button}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
          {loading && (
            <ActivityIndicator style={styles.loadingIndicator} color={"#FFF"} />
          )}
        </ButtonAction>

        <Text style={styles.signInText}>Já tem conta?</Text>
        <Link href={"/(unauthenticated)/sign-in/SignIn"}>
          <Text style={styles.signInLink}>Faça seu login!</Text>
        </Link>
      </ScrollView>
    </BackgroundGradient>
  );
}
