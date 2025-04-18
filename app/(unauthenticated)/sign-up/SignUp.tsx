import { CreateAuthUserDTO } from "@/authentication/types/auth.types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { ButtonAction } from "@/shared/components/button-action/ButtonAction";
import { TextField } from "@/shared/components/text-field/TextField";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { useRouter } from "expo-router";
import { Pressable } from "react-native-gesture-handler";
import { styles } from "../../../domain/styles/SigUp.styles"; // Importando os estilos
import { signUpUserWithEmail } from "@/redux/features/auth/thunks/sign-up";
import { ScrollView } from "react-native-gesture-handler";


const initialState: CreateAuthUserDTO = {
  name: "",
  lastName: "",
  email: "",
  password: "",
};

export default function SignUp() {
  const [isChecked, setChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter()
  const { loading, error, isFufilled } = useAppSelector((state) => state.auth.signUpMetadata);
  const dispatch = useAppDispatch()

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirmed: "",
  });

  useEffect(() => {
    if (isFufilled && !error) {
      router.back()
    }
    if (isFufilled && error) {
      Alert.alert('Tivemos um erro')
    }
  }, [isFufilled, error])

  function handleTextChange(
    inputName: "name" | "email" | "password" | "passwordConfirmed",
    text: string,
  ) {
    setUserCredentials((state) => ({
      ...state,
      [inputName]: text,
    }));
  }

  function handleLogin() {
    const { name, email, password, passwordConfirmed } = userCredentials;
    const policy = isChecked;

    if (password !== passwordConfirmed) {
      Alert.alert('As senhas não conferem!')
      return
    }

    const names = name.split(' ')

    dispatch(signUpUserWithEmail({ email, name: names[0], lastName: names[1], password }))
  }

  return (
    <BackgroundGradient style={styles.container}>
      <Text style={styles.title}>
        Swift <Text style={{ fontWeight: 300 }}>Bank</Text>
      </Text>
      <Text style={styles.subtitle}>Cadastro</Text>
      <ScrollView style={{ flex: 1 }} scrollEnabled showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>
          Boas-Vindas! Preencha seus dados para criar sua conta.
        </Text>

        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>
            Nome
          </Text>
          <TextField
            placeholder="Insira seu nome completo"
            onChangeText={(name) => handleTextChange("name", name)}
            value={userCredentials.name}
            autoCapitalize="words"

          />
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>
            Insira seu email
          </Text>
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

        <Pressable
          style={styles.policyContainer}
          onPress={() => setChecked(state => !state)}
        >
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
          />
          <Text style={styles.policyText}>
            Li e estou ciente quanto a Politica e Privacidade.
          </Text>
        </Pressable>

        <ButtonAction
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
          {loading && (
            <ActivityIndicator style={styles.loadingIndicator} color={"#FFF"} />
          )}
        </ButtonAction>

        <Text style={styles.signInText}>Já tem conta?</Text>
        <Pressable onPress={() => router.back()}
          style={{ paddingBottom: 80 }}
        >
          <Text style={styles.signInLink}>Faça seu login!</Text>
        </Pressable>
      </ScrollView>
    </BackgroundGradient>
  );
}
