import { UnauthenticatedWrapper } from "@/domains/authentication/components/unauthenticated-wrapper/UnauthenticatedWrapper";
import { signUpStyles } from "@/domains/authentication/styles/SigUp.styles";
import { CreateAuthUserDTO } from "@/domains/authentication/types/auth.types";
import { signUpUserWithEmail } from "@/redux/features/auth/thunks/sign-up";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ButtonAction } from "@/shared/components/button-action/ButtonAction";
import { TextField } from "@/shared/components/text-field/TextField";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";

const initialState: CreateAuthUserDTO = {
  name: "",
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

    dispatch(signUpUserWithEmail({ email, name: name, password }))
  }

  return (
    <UnauthenticatedWrapper
      title="Cadastro"
      subtitle="Preencha seus dados para criar sua conta."
    >
      <View style={{ marginBottom: 16 }}>
        <Text style={signUpStyles.label}>
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
        <Text style={signUpStyles.label}>
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
        <Text style={signUpStyles.label}>Senha</Text>
        <View style={signUpStyles.passwordContainer}>
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
        <Text style={signUpStyles.label}>Confirme sua senha</Text>
        <View style={signUpStyles.passwordConfirmedContainer}>
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
        style={signUpStyles.policyContainer}
        onPress={() => setChecked(state => !state)}
      >
        <Checkbox
          style={signUpStyles.checkbox}
          value={isChecked}
        />
        <Text style={signUpStyles.policyText}>
          Li e estou ciente quanto a Politica e Privacidade.
        </Text>
      </Pressable>

      <ButtonAction
        style={signUpStyles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={signUpStyles.buttonText}>Cadastrar</Text>
        {loading && (
          <ActivityIndicator style={signUpStyles.loadingIndicator} color={"#FFF"} />
        )}
      </ButtonAction>

      <Text style={signUpStyles.signInText}>Já tem conta?</Text>
      <Pressable onPress={() => router.back()}
        style={{ paddingBottom: 80 }}
      >
        <Text style={signUpStyles.signInLink}>Faça seu login!</Text>
      </Pressable>
    </UnauthenticatedWrapper >
  );
}
