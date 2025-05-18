import { Card } from "@/domains/cards/components/card/Card";
import { fetchUserByEmail } from "@/redux/features/user/thunks/fetch-user-by-email";
import { clearSelectedUser } from "@/redux/features/user/user-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ButtonAction } from "@/shared/components/button-action/ButtonAction";
import { TextField } from "@/shared/components/text-field/TextField";
import { emailRegex } from "@/shared/constants/email-regex";
import { AppBackgroundWithNavigation } from "@/shared/templates/app-background-with-navigation/AppBackgroundWithNavigation";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { styles } from "./index.styles";

export default function PixScreen() {
  const [email, setEmail] = useState('')
  const dispatch = useAppDispatch()
  const { user, loading: loadingUser } = useAppSelector(state => state.user)
  const { loading, currentAccount } = useAppSelector(state => state.account)

  useEffect(() => {
    return () => {
      dispatch(clearSelectedUser())
    }
  }, [])

  function handleSearchUser() {
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', `Email inválido: ${email}`)
      return
    }

    dispatch(fetchUserByEmail({ email: email.trim().toLowerCase() }))
    setEmail('')
  }

  return (
    <AppBackgroundWithNavigation>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 32,
          fontWeight: 600,
          marginBottom: 40
        }}
      >
        Pix
      </Text>
      <Text style={{ marginBottom: 8 }}>
        Digite a chave pix de quem você pretende enviar:
      </Text>
      <TextField
        placeholder="carlos@email.com"
        autoCapitalize="none"
        returnKeyLabel="enviar"
        returnKeyType="done"
        onChangeText={(email) => setEmail(email)}
        value={email}
      />
      <Text style={styles.hintText}>
        (no momento somente são aceitos emails)
      </Text>
      {user
        ?
        !loadingUser
          ? (
            <Link
              href={`/(authenticated)/pix/Amount`}
              style={{ width: '100%' }}
            >
              <Card style={styles.userCard}>
                <View>
                  <Text>{user.name}</Text>
                  <Text>{user.email}</Text>
                </View>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </Card>
            </Link>
          )
          : (
            <Card>
              <Text>Buscando usuário!</Text>
              <ActivityIndicator size={'small'} />
            </Card>
          )
        : (
          <Card>
            <Text>Procure uma chave pix, se encontrada o usuário será mostrado aqui :) </Text>
            {loading || loadingUser && <ActivityIndicator size={'small'} color={'#111'} />}
          </Card>
        )}
      <ButtonAction
        style={styles.button}
        onPress={handleSearchUser}
      >
        <Text style={styles.buttonText}>
          Procurar chave pix
        </Text>
        {loading || loadingUser && <ActivityIndicator size="small" style={styles.loading} />}
      </ButtonAction>
    </AppBackgroundWithNavigation>
  )
}
