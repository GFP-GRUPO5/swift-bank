import { useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signInUserWithEmail } from "@/redux/features/auth/thunks/sign-in";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { TextField } from "@/shared/components/text-field/TextField";
import { ButtonAction } from "@/shared/components/button-action/ButtonAction";
import { TextLink } from "@/shared/components/text-link/TextLink";
import { signInStyles } from '@/domains/authentication/styles/SigIn.styles'

export default function SignInScreen() {
  const [isVisible, setIsVisible] = useState(false)
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' })
  const { signInMetadata: { loading }, user } = useAppSelector(state => state.auth)
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
    <BackgroundGradient style={signInStyles.container}>
      <Text style={signInStyles.title}>
        Swift {' '}
        <Text style={{ fontWeight: 300 }}>
          Bank
        </Text>
      </Text>
      <Text
        style={signInStyles.subtitle}>Login</Text>
      <Text style={signInStyles.welcomeText}>Boas-Vindas</Text>

      <View style={{ marginBottom: 16 }}>
        <Text style={signInStyles.label}>Insira seu email</Text>
        <TextField
          placeholder="E-mail"
          onChangeText={(email) => handleTextChange('email', email)}
          value={userCredentials.email}
          autoCapitalize="none"
        />
      </View>

      <View>
        <Text style={signInStyles.label}>Senha</Text>
        <View style={signInStyles.passwordContainer}>
          <TextField
            placeholder="***********"
            secureTextEntry={isVisible}
            style={{ paddingRight: 56 }}
            onChangeText={(password) => handleTextChange('password', password)}
            value={userCredentials.password}
            autoCapitalize="none"
          />
          <Pressable style={signInStyles.eyeIcon} onPress={() => setIsVisible((state) => !state)}>
            {isVisible ? (
              <Entypo name="eye-with-line" size={24} color="black" />
            ) : (
              <Entypo name="eye" size={24} color="black" />
            )}
          </Pressable>
        </View>
      </View>
      <TextLink
        linkStyles={{ marginBottom: 16 }}
        textStyles={signInStyles.forgotPasswordLink}
        href="/(unauthenticated)/(forgot-password)/"
        label="Esqueci minha senha"
      />
      <ButtonAction style={signInStyles.button} onPress={handleLogin} disabled={loading}>
        <Text style={signInStyles.buttonText}>Entrar</Text>
        {loading && <ActivityIndicator style={signInStyles.loadingIndicator} color={"#FFF"} />}
      </ButtonAction>
      <Text style={signInStyles.signUpText}>Ainda não tem conta?</Text>
      <TextLink href="/(unauthenticated)/sign-up/SignUp" label="Faça seu cadastro!" />
    </BackgroundGradient>
  );
}