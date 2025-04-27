import { AccountType } from "@/domains/account/models/Account.dto";
import { CardCreationCard } from "@/domains/cards/components/card-creation-card/CardCreationCard";
import { Card } from "@/domains/cards/components/card/Card";
import { fetchAccount } from "@/redux/features/account/thunks/fetch-account";
import { changePassword } from "@/redux/features/auth/thunks/change-password";
import { signOutUser } from "@/redux/features/auth/thunks/sign-out";
import { updateUserProfile } from "@/redux/features/auth/thunks/update-user-profile";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AppHeader } from "@/shared/components/app-header/AppHeader";
import { ButtonAction } from "@/shared/components/button-action/ButtonAction";
import { HeaderGoBackButton } from "@/shared/components/header-go-back-button/HeaderGoBackButton";
import { Logo } from "@/shared/components/logo/Logo";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { format } from 'date-fns';
import { useRouter } from "expo-router";
import { Suspense, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const accountTypeMap: { [key in AccountType]: string } = {
  'debit': 'Débito',
  'savings': 'Poupança',
}

interface UserData {
  name: string
  email: string
}

export default function UserProfile() {
  const { user, changePasswordMetadata: { isFufilled, error } } = useAppSelector(state => state.auth)
  const { currentAccount } = useAppSelector(state => state.account)
  const [editionMode, setEditionMode] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [userData, setUserData] = useState<UserData>({
    name: `${user?.displayName}`,
    email: `${user?.email}`,
  })
  const [password, setPassword] = useState({ currentPassword: '', newPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [shouldSignOut, setShouldSignOut] = useState(false)

  useEffect(() => {
    dispatch(fetchAccount(user?.uid!))
  }, [])

  function handleEditProfile() {
    if (editionMode && (!!userData.name)) {
      dispatch(updateUserProfile({ displayName: userData.name }))
      setEditionMode(false)
      return
    }
    setEditionMode(state => !state)
  }

  function handleSignOut() {
    dispatch(signOutUser())
    setTimeout(() => {
      router.push('/(unauthenticated)/sign-in/SignIn')
    }, 500)
  }

  function handleSavePassword() {
    const { currentPassword, newPassword } = password

    if (currentPassword && newPassword) {
      dispatch(changePassword({ currentPassword, newPassword }))
      setPassword({ currentPassword: '', newPassword: '' })
    }
  }

  const updatePasswordButtonDisabled = !password.currentPassword
    && !password.newPassword

  return (
    <>
      <BackgroundGradient>
        <AppHeader
          style={{ paddingTop: 16, borderBottomWidth: 1 }}
          leftContent={<HeaderGoBackButton isModal />}
          centerContent={<Logo />}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Perfil {' '}
        </Text>
        <ScrollView style={{ paddingTop: 32 }} showsVerticalScrollIndicator={false}>
          <Card>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
              <TextInput
                style={{ fontWeight: 600, fontSize: 24, marginBottom: 16 }}
                value={userData.name}
                onChangeText={(text) => setUserData(state => ({ ...state, name: text }))}
                autoCapitalize="words"
                editable={editionMode}
              />
              <Pressable onPress={handleEditProfile}>
                {
                  editionMode
                    ? <AntDesign name="checkcircleo" size={24} color="black" />
                    : <Feather name="edit-2" size={24} color="black" />
                }
              </Pressable>
            </View>
            <View style={{ marginBottom: 32, gap: 8 }}>
              <Text style={{ fontWeight: 600 }}>Email ativo</Text>
              <Text>{user?.email}</Text>
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
            <View style={{ flexDirection: 'row', marginBottom: 8, marginTop: 16, alignItems: 'center', gap: 8 }}>
              <View style={{ height: 8, width: 8, borderRadius: '100%', backgroundColor: 'green' }} />
            </View>

            <Card key={currentAccount?.userId} style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: 700, marginBottom: 24 }}>
                Conta {accountTypeMap[currentAccount?.accountType!]}
              </Text>
              <Text style={{ marginBottom: 16 }}>
                Saldo disponível:{' '}
                <Text style={{ fontWeight: 700 }}>{new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(currentAccount?.currentAmount ?? 0)}
                </Text>
              </Text>
              <Text style={{ marginBottom: 8 }}>
                Criada em {format(currentAccount?.createdAt!, 'dd/MM/yyyy')}
              </Text>
              <Text>
                Última transação em: {format(currentAccount?.updatedAt!, 'dd/MM/yyyy')}
              </Text>
            </Card>

          </Suspense>
        </ScrollView>
        <Pressable
          style={{
            backgroundColor: 'red',
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderRadius: 8,
            marginTop: 'auto'
          }}
          onPress={() => setShouldSignOut(true)}
        >
          <Text style={{ color: '#FFF', textAlign: 'center', fontWeight: 700 }}>Log Out</Text>
        </Pressable>
      </BackgroundGradient>
      {
        shouldSignOut && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: '#291f065e',
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                width: '85%',
                padding: 16,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 500, textAlign: 'center', marginBottom: 56 }}>
                Você tem certeza que deseja sair?
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ButtonAction
                  style={{
                    backgroundColor: 'red',
                    padding: 8,
                    width: 100,
                    borderRadius: 4,
                  }}
                  label="Sair"
                  onPress={handleSignOut}
                />
                <ButtonAction
                  style={{
                    padding: 8,
                    width: 100,
                    borderRadius: 4,
                    borderWidth: 1,
                  }}
                  label="Voltar"
                  contrast
                  onPress={() => setShouldSignOut(false)}
                />
              </View>
            </View>
          </View>
        )
      }
    </>
  )
}
