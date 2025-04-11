import { colors } from "@/theme/colors";
import { useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from "expo-router";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signInUserWithEmail } from "@/redux/features/auth/thunks/sign-in";
import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient";
import { TextField } from "@/domain/components/atoms/text-field/TextField";
import { ButtonAction } from "@/domain/components/atoms/button-action/ButtonAction";

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
    <BackgroundGradient>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 700,
          marginTop: 56,
          textAlign: 'center',
          marginBottom: 72,
        }}
      >
        Swift {' '}
        <Text style={{ fontWeight: 300 }}>
          Bank
        </Text>
      </Text>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: 48,
        }}
      >
        Login
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: colors.typography.body,
          fontWeight: 400,
          marginBottom: 32,
        }}
      >
        Boas-Vindas
      </Text>
      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            fontWeight: 700,
            fontSize: 16,
            color: colors.typography.body,
            marginBottom: 8
          }}
        >
          Insira seu email
        </Text>
        <TextField
          placeholder="E-mail"
          onChangeText={(email) => handleTextChange('email', email)}
          value={userCredentials.email}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text
          style={{
            fontWeight: 700,
            fontSize: 16,
            color: colors.typography.body,
            marginBottom: 8
          }}
        >
          Senha
        </Text>
        <View style={{ position: 'relative', marginBottom: 8 }}>
          <TextField
            placeholder="***********"
            secureTextEntry={isVisible}
            style={{ paddingRight: 56 }}
            onChangeText={(password) => handleTextChange('password', password)}
            value={userCredentials.password}
            autoCapitalize="none"
          />
          <Pressable
            style={{
              position: 'absolute',
              right: 16,
              top: 16,
            }}
            onPress={() => setIsVisible(state => !state)}
          >
            {
              isVisible
                ? <Entypo name="eye-with-line" size={24} color="black" />
                : <Entypo name="eye" size={24} color="black" />
            }
          </Pressable>
        </View>
      </View>
      <Link href={"/(unauthenticated)/sign-up/SignUp"} style={{ marginBottom: 32 }}>
        <Text
          style={{
            textAlign: 'right',
            textDecorationLine: 'underline',
            fontSize: 12,
            color: colors.typography.body,
            paddingRight: 8,
          }}
        >
          Esqueci minha senha
        </Text>
      </Link>
      <ButtonAction
        style={{
          backgroundColor: '#2c2c2c',
          padding: 16,
          borderRadius: 24,
          marginBottom: 32,
          position: 'relative'
        }}
        onPress={handleLogin}
        disabled={loading}
      >
        
        <Text style={{ color: '#FFF', textAlign:'center', fontSize: 16, fontWeight: 700 }}>Entar</Text>
        {loading && <ActivityIndicator style={{ position: 'absolute', right: 16, top: 14 }} color={'#FFF'} />}
        
      </ButtonAction>
      <Text
        style={{
          fontSize: 16,
          color: colors.typography.body,
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        Ainda não tem conta?
      </Text>
      <Link href={'/(unauthenticated)/sign-up/SignUp'}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 600,
            textDecorationLine: 'underline',
            textAlign: 'center',
            color: colors.typography.body,
          }}
        >
          Faça seu cadastro!
        </Text>
      </Link>
    </BackgroundGradient>
  );
}
