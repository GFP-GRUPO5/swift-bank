import { useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signInUserWithEmail } from "@/redux/features/auth/thunks/sign-in";
import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient";
import { TextField } from "@/domain/components/atoms/text-field/TextField";
import { ButtonAction } from "@/domain/components/atoms/button-action/ButtonAction";

import { styles } from "../../../domain/styles/SigIn.styles"; // Importando os estilos

export default function SignInScreen() {
  const [isVisible, setIsVisible] = useState(false)
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' })
  const { loading } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  function handleTextChange(inputName: 'email' | 'password', text: string) {
    setUserCredentials(state => ({
      ...state,
      [inputName]: text
    }))
  }

  function handleLogin() {
    const { email, password } = userCredentials
    dispatch(signInUserWithEmail({ email, password }))
  }

  return (
    <BackgroundGradient style={styles.container}>
      <Text style={styles.title}>
        Swift {' '}
        <Text style={{ fontWeight: 300 }}>
          Bank
        </Text>
      </Text>
      <Text
        style={styles.subtitle}>Login</Text>
      <Text style={styles.welcomeText}>Boas-Vindas</Text>

      <View style={{ marginBottom: 16 }}>
        <Text style={styles.label}>Insira seu email</Text>
        <TextField
          placeholder="E-mail"
          onChangeText={(email) => handleTextChange('email', email)}
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
            onChangeText={(password) => handleTextChange('password', password)}
            value={userCredentials.password}
            autoCapitalize="none"
          />
          <Pressable style={styles.eyeIcon} onPress={() => setIsVisible((state) => !state)}>
            {isVisible ? (
              <Entypo name="eye-with-line" size={24} color="black" />
            ) : (
              <Entypo name="eye" size={24} color="black" />
            )}
          </Pressable>
        </View>
      </View>

      <Link href={"/(unauthenticated)/sign-up/SignUp"} style={{ marginBottom: 32 }}>
        <Text style={styles.forgotPasswordLink}>Esqueci minha senha</Text>
      </Link>

      <ButtonAction style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>Entrar</Text>
        {loading && <ActivityIndicator style={styles.loadingIndicator} color={"#FFF"} />}
      </ButtonAction>

      <Text style={styles.signUpText}>Ainda não tem conta?</Text>
      <Link href={"/(unauthenticated)/sign-up/SignUp"}>
        <Text style={styles.signUpLink}>Faça seu cadastro!</Text>
      </Link>
    </BackgroundGradient>
  );
}