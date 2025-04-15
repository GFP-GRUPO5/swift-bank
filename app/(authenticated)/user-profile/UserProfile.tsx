
import { Card } from "@/domain/components/atoms/card/Card";
import { HeaderGoBackButton } from "@/domain/components/atoms/header-go-back-button/HeaderGoBackButton";
import { AppHeader } from "@/domain/components/molecules/app-header/AppHeader";
import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient";
import { signOutUser } from "@/redux/features/auth/thunks/sign-out";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "expo-router";
import { ActivityIndicator, Pressable, Text, TextInput, TextInputBase, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { Suspense, useEffect, useState } from "react";
import { format } from 'date-fns'
import { fetchAllAccounts } from "@/redux/features/account/thunks/fetch-accounts";
import { AccountType } from "@/domain/models/Account.dto";
import AntDesign from '@expo/vector-icons/AntDesign';
import { CardCreationCard } from "@/domain/components/molecules/card-creation-card/CardCreationCard";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { changePassword } from "@/redux/features/auth/thunks/change-password";

const accountTypeMap: { [key in AccountType]: string } = {
  'debit': 'Débito',
  'savings': 'Poupança',
}

interface UserData {
  name: string
  email: string
}

export default function UserProfile() {
  const { user, loading } = useAppSelector(state => state.auth)
  const { accounts } = useAppSelector(state => state.account)
  const [editionMode, setEditionMode] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [userData, setUserData] = useState<UserData>({
    name: `${user?.name} ${user?.lastName}`,
    email: `${user?.email}`,
  })
  const [password, setPassword] = useState({ currentPassword: '', newPassword: '' })
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    dispatch(fetchAllAccounts(user?.id!))
  }, [])

  function handleEditProfile() {
    setEditionMode(state => !state)
  }

  function handleSignOut() {
    dispatch(signOutUser())
    setTimeout(() => {
      console.log(user)
      router.push('/(unauthenticated)/sign-in/SignIn')
    }, 100)
  }

  function handleSavePassword() {
    const { currentPassword, newPassword } = password

    if (currentPassword && newPassword) {
      dispatch(changePassword({ currentPassword, newPassword }))
    }
  }

  const updatePasswordButtonDisabled = !password.currentPassword
    && !password.newPassword

  return (
    <BackgroundGradient>
      <AppHeader
        style={{ paddingTop: 16, borderBottomWidth: 1 }}
        leftContent={<HeaderGoBackButton isModal />}
        centerContent={<Text style={{ fontSize: 24, fontWeight: 600 }}>Perfil</Text>}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: "700",
          marginTop: 8,
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        Swift {' '}
        <Text style={{ fontWeight: 300 }}>
          Bank
        </Text>
      </Text>
      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <TextInput
            style={{ fontWeight: 600, fontSize: 24 }}
            value={userData.name}
            onChangeText={(text) => setUserData(state => ({ ...state, name: text }))}
            autoCapitalize="words"
            editable={editionMode}
          />
          <Pressable onPress={handleEditProfile}>
            {editionMode ? <AntDesign name="checkcircleo" size={24} color="black" /> : <Feather name="edit-2" size={24} color="black" />}
          </Pressable>
        </View>
        <Text style={{ fontSize: 12, marginBottom: 16 }}>
          Conta criada em {user && format(user?.createdAt!, 'dd/MM/yyyy')}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32, gap: 8 }}>
          <TextInput value={userData.email} />
        </View>
        <View style={{ marginBottom: 16 }}>
          <View style={{ marginBottom: 32 }}>
            <Text style={{ marginBottom: 16 }}>
              Senha atual
            </Text>
            <View style={{ position: 'relative', width: 150 }}>
              <TextInput
                style={{ borderBottomWidth: 1, width: 150 }}
                placeholder="******"
                onChangeText={(currentPassword) => setPassword(state => ({
                  ...state,
                  currentPassword,
                }))}
                secureTextEntry={showPassword}
                value={password.currentPassword ?? ''}
                autoCapitalize="none"
              />
              <Pressable
                style={{ position: 'absolute', right: 0 }}
                onPress={() => setShowPassword(state => !state)}
              >
                <AntDesign name={showPassword ? "eye" : "eyeo"} />
              </Pressable>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <View>
              <Text style={{ marginBottom: 16 }}>
                Nova senha
              </Text>
              <View style={{ position: 'relative', width: 150 }}>
                <TextInput
                  style={{ borderBottomWidth: 1, width: 150 }}
                  placeholder="******"
                  onChangeText={(newPassword) => setPassword(state => ({
                    ...state,
                    newPassword,
                  }))}
                  secureTextEntry={showPassword}
                  value={password.newPassword ?? ''}
                  autoCapitalize="none"
                />
                <Pressable
                  style={{ position: 'absolute', right: 0 }}
                  onPress={() => setShowPassword(state => !state)}
                >
                  <AntDesign name={showPassword ? "eye" : "eyeo"} />
                </Pressable>
              </View>
            </View>
            <View>
              <Pressable
                style={{
                  backgroundColor: updatePasswordButtonDisabled ? '#2c2c2cbb' : '#2c2c2c',
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                  borderRadius: 4,
                }}
                onPress={handleSavePassword}
                disabled={updatePasswordButtonDisabled}
              >
                <Text style={{ color: '#EFEFEF', fontWeight: 600 }}>
                  Alterar senha
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Card>

      <CardCreationCard
        buttonTitle="Criar nova conta"
        href="/(authenticated)/account/creation/AccountCreation"
        sectionTitle=""
        style={{}}
      />

      <Suspense fallback={<View><ActivityIndicator /></View>}>
        <ScrollView style={{ paddingTop: 32 }}>

          {accounts?.map(account => (
            <Card key={account.userId} style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: 700, marginBottom: 24 }}>
                Conta {accountTypeMap[account?.accountType]}
              </Text>
              <Text style={{ marginBottom: 16 }}>
                Saldo disponível:{' '}
                <Text style={{ fontWeight: 700 }}>{new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(account.currentAmmount)}
                </Text>
              </Text>
              <Text style={{ marginBottom: 8 }}>
                Criada em {format(account?.createdAt, 'dd/MM/yyyy')}
              </Text>
              <Text>
                Última transação em: {format(account?.updatedAt, 'dd/MM/yyyy')}
              </Text>
            </Card>
          ))}
        </ScrollView>
      </Suspense>

      <Pressable
        style={{
          backgroundColor: 'red',
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderRadius: 8,
          marginTop: 'auto'
        }}
        onPress={handleSignOut}
        disabled={loading}
      >
        <Text style={{ color: '#FFF', textAlign: 'center', fontWeight: 700 }}>Log Out</Text>
      </Pressable>
    </BackgroundGradient>
  )
}
