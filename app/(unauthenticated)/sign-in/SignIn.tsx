import { UnauthenticatedWrapper } from '@/domains/authentication/components/unauthenticated-wrapper/UnauthenticatedWrapper';
import { signInStyles } from '@/domains/authentication/styles/SigIn.styles';
import { signInUserWithEmail } from "@/redux/features/auth/thunks/sign-in";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ButtonAction } from "@/shared/components/button-action/ButtonAction";
import { TextField } from "@/shared/components/text-field/TextField";
import { TextLink } from "@/shared/components/text-link/TextLink";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";

export default function SignInScreen() {
  const [isVisible, setIsVisible] = useState(false)
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' })
  const { signInMetadata: { loading, error }, user } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (error?.hasError && error?.message) {
      Alert.alert('Erro ao entrar', error.message)
    }
  }, [error])

  function handleTextChange(inputName: 'email' | 'password', text: string) {
    setUserCredentials(state => ({
      ...state,
      [inputName]: text
    }))
  }

  function handleLogin() {
    const { email, password } = userCredentials

    if (!email || !password) return

    dispatch(signInUserWithEmail({ email, password }))
  }

  return (
    <UnauthenticatedWrapper
      title="Login"
      subtitle="Boas-vindas!"
    >
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
        href="/(unauthenticated)/forgot-password/"
        label="Esqueci minha senha"
      />
      <ButtonAction style={signInStyles.button} onPress={handleLogin} disabled={loading}>
        <Text style={signInStyles.buttonText}>Entrar</Text>
        {loading && <ActivityIndicator style={signInStyles.loadingIndicator} color={"#FFF"} />}
      </ButtonAction>
      <Text style={signInStyles.signUpText}>Ainda não tem conta?</Text>
      <TextLink href="/(unauthenticated)/sign-up/SignUp" label="Faça seu cadastro!" />
    </UnauthenticatedWrapper>
  );
}