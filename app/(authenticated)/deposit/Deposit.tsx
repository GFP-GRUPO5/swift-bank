import { addStatement } from "@/redux/features/account/thunks/add-statements";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AppHeader } from "@/shared/components/app-header/AppHeader";
import { ButtonAction } from "@/shared/components/button-action/ButtonAction";
import { HeaderGoBackButton } from "@/shared/components/header-go-back-button/HeaderGoBackButton";
import { IconSwiftBankLogo } from "@/shared/icons/IconSwiftBankLogo";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import CurrencyInput from 'react-native-currency-input';
import { transactionStyles } from '@/shared/styles/Transaction.styles';

export default function DepositScreen() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { currentAccount, loading } = useAppSelector(state => state.account)
  const [value, setValue] = useState<number | null>(0)


  function handleAddDeposit() {
    if (!currentAccount?.userId || !value) return

    dispatch(addStatement({
      accountId: currentAccount?.userId,
      statement: {
        createdAt: new Date().toISOString(),
        category: 'deposit',
        type: 'Depósito',
        value
      }
    }))
    setValue(0)
    Alert.alert('Sucesso', 'Depósito bem sucedida', [{ onPress: () => router.dismissAll() }])
  }

  return (
    <BackgroundGradient>
      <AppHeader
        style={{ paddingTop: 16, borderBottomWidth: 1 }}
        leftContent={<HeaderGoBackButton isModal />}
        rigthContent={<IconSwiftBankLogo />}
      />
      <View style={{ marginBottom: 64 }}>
        <Text style={transactionStyles.title}>Depósito</Text>
        <Text>
          Aqui você pode adicionar dinheiro para sua conta da Swift Bank,
          {' '}basta adicionar o valor que magicamente ele entra na conta.
        </Text>
      </View>
      <View style={{ marginBottom: 'auto' }}>
        <Text style={{ marginBottom: 8, fontWeight: 600 }}>
          Adicione o valor desejado:
        </Text>
        <CurrencyInput
          style={transactionStyles.input}
          placeholder="R$ 2.000.000,00"
          value={value}
          onChangeValue={(e) => setValue(e)}
          precision={2}
          prefix="R$ "
          delimiter="."
          separator=","
        />
      </View>
      <ButtonAction
        onPress={handleAddDeposit}
        style={[
          transactionStyles.button, 
          {backgroundColor: loading ? '#2c2c2c77' : '#2c2c2c'}
        ]}
        disabled={loading}
      >
        <Text style={transactionStyles.textButton}>Depositar</Text>
        {loading && (
          <ActivityIndicator
            size={'small'}
            style={{ position: 'absolute', right: 16, top: 18 }}
            color={'#FFF'}
          />
        )}
      </ButtonAction>
    </BackgroundGradient>
  )
}
