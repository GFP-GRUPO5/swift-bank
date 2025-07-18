import { UnauthenticatedWrapper } from '@/modules/authentication/presentation/components/unauthenticated-wrapper/UnauthenticatedWrapper';
import { forgotPasswordStyles } from '@/modules/authentication/presentation/styles/ForgotPassword.styles';
import { sendForgotPasswordEmail } from '@/modules/authentication/presentation/thunks/forgot-passwordf';
import { ButtonAction } from '@/shared/presentation/components/button-action/ButtonAction';
import { TextField } from '@/shared/presentation/components/text-field/TextField';
import { useAppDispatch } from '@/shared/redux/hooks';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();

  async function handleSendNewPassword() {
    dispatch(sendForgotPasswordEmail({ email }));
  }

  return (
    <UnauthenticatedWrapper
      title="Esqueceu sua senha?"
      subtitle="Enviaremos um e-mail com instruções de como redefinir sua senha."
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ marginBottom: 16 }}>
        <Text style={forgotPasswordStyles.label}>Insira seu email</Text>
        <TextField
          placeholder="E-mail"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <ButtonAction
        style={forgotPasswordStyles.button}
        onPress={handleSendNewPassword}
      >
        <Text style={forgotPasswordStyles.buttonText}>Enviar</Text>
      </ButtonAction>
      <Text style={forgotPasswordStyles.backToSignInText}>
        Lembrou sua senha?
      </Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={forgotPasswordStyles.backToSignInLink}>
          Faça seu Login!
        </Text>
      </TouchableOpacity>
    </UnauthenticatedWrapper>
  );
}
