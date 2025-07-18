import { AccountType } from '@/modules/account/domain/models/Account.dto';
import { fetchAccount } from '@/modules/account/presentation/thunks/fetch-account';
import { modalStyles } from '@/modules/authentication/presentation/styles/Modal.styles';
import { userProfileStyle } from '@/modules/authentication/presentation/styles/Userprofile.styles';
import { changePassword } from '@/modules/authentication/presentation/thunks/change-password';
import { signOutUser } from '@/modules/authentication/presentation/thunks/sign-out';
import { updateUserProfile } from '@/modules/authentication/presentation/thunks/update-user-profile';
import { AppHeader } from '@/shared/presentation/components/app-header/AppHeader';
import { ButtonAction } from '@/shared/presentation/components/button-action/ButtonAction';
import { Card } from '@/shared/presentation/components/card/Card';
import { HeaderGoBackButton } from '@/shared/presentation/components/header-go-back-button/HeaderGoBackButton';
import { IconSwiftBankLogo } from '@/shared/presentation/icons/IconSwiftBankLogo';
import { BackgroundGradient } from '@/shared/presentation/templates/background-gradient/BackgroundGradient';
import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import { Suspense, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import Dialog from 'react-native-dialog';
import { ScrollView } from 'react-native-gesture-handler';

const accountTypeMap: { [key in AccountType]: string } = {
  debit: 'Débito',
  savings: 'Poupança',
};

interface UserData {
  name: string;
  email: string;
}

export default function UserProfile() {
  const {
    user,
    changePasswordMetadata: { isFufilled: _isFufilled, error: _error },
  } = useAppSelector((state) => state.auth);
  const { currentAccount } = useAppSelector((state) => state.account);
  const [editionMode, setEditionMode] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    name: `${user?.displayName}`,
    email: `${user?.email}`,
  });
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [selectDialogVisible, setSelectDialogVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchAccount(user?.uid!));
  }, []);

  function handleEditProfile() {
    if (editionMode && !!userData.name) {
      dispatch(updateUserProfile({ displayName: userData.name }));
      setEditionMode(false);
      return;
    }
    setEditionMode((state) => !state);
  }

  function handleSignOut() {
    dispatch(signOutUser());
    setTimeout(() => {
      router.push('/(unauthenticated)/sign-in/SignIn');
    }, 500);
  }

  function handleSavePassword() {
    const { currentPassword, newPassword } = password;

    if (currentPassword && newPassword) {
      dispatch(changePassword({ currentPassword, newPassword }));
      setPassword({ currentPassword: '', newPassword: '' });
    }
  }

  const updatePasswordButtonDisabled =
    !password.currentPassword && !password.newPassword;

  return (
    <>
      <BackgroundGradient>
        <AppHeader
          style={{ paddingTop: 16, borderBottomWidth: 1 }}
          leftContent={<HeaderGoBackButton isModal />}
          rigthContent={<IconSwiftBankLogo />}
        />
        <Text style={userProfileStyle.titleText}>Configurações</Text>
        <ScrollView
          style={{ paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <Card>
            <View style={userProfileStyle.settingsContainer}>
              <TextInput
                style={userProfileStyle.textInputName}
                value={userData.name}
                onChangeText={(text) =>
                  setUserData((state) => ({ ...state, name: text }))
                }
                autoCapitalize="words"
                editable={editionMode}
              />
              <Pressable onPress={handleEditProfile}>
                {editionMode ? (
                  <MaterialIcons name="check-box" size={24} color="#2C2C2C" />
                ) : (
                  <MaterialIcons name="settings" size={24} color="#2C2C2C" />
                )}
              </Pressable>
            </View>

            <View>
              <Text style={userProfileStyle.textSubtitle}>Email ativo</Text>
              <Text style={userProfileStyle.textEmail}>{user?.email}</Text>
            </View>

            <View>
              <View>
                <Text style={userProfileStyle.textSubtitle}>Senha atual</Text>
                <View style={userProfileStyle.passwordContainer}>
                  <TextInput
                    style={userProfileStyle.textInputPassword}
                    placeholder="******"
                    onChangeText={(currentPassword) =>
                      setPassword((state) => ({
                        ...state,
                        currentPassword,
                      }))
                    }
                    secureTextEntry={showPassword}
                    value={password.currentPassword ?? ''}
                    autoCapitalize="none"
                  />
                  <Pressable
                    style={userProfileStyle.eyeIcon}
                    onPress={() => setShowPassword((state) => !state)}
                  >
                    <AntDesign name={showPassword ? 'eye' : 'eyeo'} />
                  </Pressable>
                </View>
              </View>

              <View style={userProfileStyle.containerNewPassword}>
                <View>
                  <Text style={userProfileStyle.textSubtitle}>Nova senha</Text>
                  <View style={userProfileStyle.passwordContainer}>
                    <TextInput
                      style={userProfileStyle.textInputNewPassword}
                      placeholder="******"
                      onChangeText={(newPassword) =>
                        setPassword((state) => ({
                          ...state,
                          newPassword,
                        }))
                      }
                      secureTextEntry={showPassword}
                      value={password.newPassword ?? ''}
                      autoCapitalize="none"
                    />
                    <Pressable
                      style={userProfileStyle.eyeIcon}
                      onPress={() => setShowPassword((state) => !state)}
                    >
                      <AntDesign name={showPassword ? 'eye' : 'eyeo'} />
                    </Pressable>
                  </View>
                </View>

                <View>
                  <Pressable
                    style={{
                      backgroundColor: updatePasswordButtonDisabled
                        ? '#2c2c2caa'
                        : '#2c2c2c',
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 24,
                    }}
                    onPress={handleSavePassword}
                    disabled={updatePasswordButtonDisabled}
                  >
                    <Text style={userProfileStyle.textButtonChangePassword}>
                      Alterar senha
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Card>

          <ButtonAction
            style={userProfileStyle.buttonCreateNewAccount}
            onPress={() =>
              router.navigate('/(authenticated)/card-creation/CardCreation')
            }
          >
            <Text style={userProfileStyle.textButtonCreateNewAccount}>
              Criar nova conta
            </Text>
          </ButtonAction>

          <Suspense
            fallback={
              <View>
                <ActivityIndicator />
              </View>
            }
          >
            <Card
              key={currentAccount?.userId}
              style={userProfileStyle.containerAccount}
            >
              <View style={userProfileStyle.greenIndicator} />
              <Text style={userProfileStyle.titleAccount}>
                Conta {accountTypeMap[currentAccount?.accountType!]}
              </Text>
              <Text>
                Saldo disponível:{' '}
                <Text>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(currentAccount?.currentAmount ?? 0)}
                </Text>
              </Text>
              <Text>
                Criada em {format(currentAccount?.createdAt!, 'dd/MM/yyyy')}
              </Text>
              <Text>
                Última transação em:{' '}
                {format(currentAccount?.updatedAt!, 'dd/MM/yyyy')}
              </Text>
            </Card>
          </Suspense>
        </ScrollView>
        <Pressable
          style={userProfileStyle.buttonLogOut}
          onPress={() => setSelectDialogVisible(true)}
        >
          <Text style={userProfileStyle.textButtonLogOut}>Sair</Text>
        </Pressable>

        <Dialog.Container visible={selectDialogVisible}>
          <Dialog.Title>Sair</Dialog.Title>
          <Dialog.Description>
            Você tem certeza que deseja sair?
          </Dialog.Description>
          <View style={modalStyles.containerModal}>
            <Dialog.Button
              style={modalStyles.textOption}
              label="Cancelar"
              onPress={() => setSelectDialogVisible(false)}
            />
            <Dialog.Button
              style={modalStyles.textOption}
              label="Sair"
              onPress={handleSignOut}
            />
          </View>
        </Dialog.Container>
      </BackgroundGradient>
    </>
  );
}
