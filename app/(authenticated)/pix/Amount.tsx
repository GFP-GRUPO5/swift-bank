import { fetchAccount } from "@/redux/features/account/thunks/fetch-account";
import { sendPix } from "@/redux/features/account/thunks/send-pix";
import { clearSelectedUser } from "@/redux/features/user/user-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ButtonAction } from "@/shared/components/button-action/ButtonAction";
import { AppBackgroundWithNavigation } from "@/shared/templates/app-background-with-navigation/AppBackgroundWithNavigation";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { styles } from "./Amount.styles";

export default function AmountScreen() {
  const account = useAppSelector(state => state.account)
  const { user, error: userError } = useAppSelector(state => state.user)
  const { user: currentUser } = useAppSelector(state => state.auth)
  const { errors: accountError } = useAppSelector(state => state.account)
  const [value, setValue] = useState(0.0)
  const [hasError, setError] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    return () => {
      dispatch(clearSelectedUser())
    }
  }, [])

  function handleNewPix() {
    dispatch(clearSelectedUser())
    router.back()
  }

  function handleSendPix() {
    const isValidPix = !value
    || account?.currentAccount?.currentAmount! < value
    || !user?.id
    || !currentUser?.uid

    if (isValidPix) {
      Alert.alert(
        'Erro',
        'Oops, algum erro do nosso lado, tente mais tarde!'
      )
      return
    }

    dispatch(sendPix({ value, userId: user?.id }))
    dispatch(fetchAccount(currentUser?.uid!))
    
    Alert.alert(
      'Sucess',
      `Pix enviado com sucesso para ${user.name}, deseja enviar outro pix?`,
      [
        {
          onPress: handleNewPix,
          text: 'Novo pix'
        },
        {
          onPress: () => router.dismissTo('/(authenticated)'),
          text: 'Finalizar',
        }
      ]
    )
  }

  return (
    <AppBackgroundWithNavigation>
      <Text style={{ fontSize: 22, fontWeight: 300, marginBottom: 24 }}>
        Selecione o valor a ser enviado para{' '}
        <Text style={{ fontWeight: 600 }}>
          {user?.name}
        </Text>
      </Text>
      <CurrencyInput
        style={styles.currencyInput}
        value={value}
        onChangeValue={(value) => setValue(value || 0)}
        prefix="R$ "
        keyboardType="decimal-pad"
        returnKeyLabel="enviar"
        returnKeyType="done"
      />
      <ButtonAction
        style={styles.button}
        onPress={handleSendPix}
        disabled={account.loading}
      >
        <Text
          style={styles.buttonText}
        >
          Enviar
        </Text>
        {account.loading && (
          <ActivityIndicator
            size="small"
            style={styles.loadingIndicator}
          />
        )}
      </ButtonAction>
    </AppBackgroundWithNavigation>
  )
}
