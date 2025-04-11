import { TextField } from "@/components/atoms/text-field/TextField";
import { BackgroundGradient } from "@/components/templates/background-gradient/BackgroundGradient";
import { colors } from "@/theme/colors";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from "expo-router";
import { ButtonAction } from "@/components/atoms/button-action/ButtonAction";
import { AuthService } from "@/services/auth.services";

export default function SignInScreen() {
  const [isVisible, setIsVisible] = useState(false)
  const [] = useState()

  function handleLogin() {}

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
        Swift Bank
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
        <TextField placeholder="E-mail" />
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
        label="Entrar"
        style={{
          backgroundColor: '#2c2c2c',
          padding: 16,
          borderRadius: 24,
          marginBottom: 32,
        }}
        onPress={handleLogin}
      />
      <Text style={{ fontSize:16, color:colors.typography.body, textAlign: 'center', marginBottom: 8 }}>Ainda não tem conta?</Text>
      <Link href={'/(unauthenticated)/sign-up/SignUp'}>
        <Text style={{
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
