import { addStatement } from "@/redux/features/account/thunks/add-statements";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AppHeader } from "@/shared/components/app-header/AppHeader";
import { ButtonAction } from "@/shared/components/button-action/ButtonAction";
import { HeaderGoBackButton } from "@/shared/components/header-go-back-button/HeaderGoBackButton";
import { IconSwiftBankLogo } from "@/shared/icons/IconSwiftBankLogo";
import { transactionStyles } from '@/shared/styles/Transaction.styles';
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import CurrencyInput from 'react-native-currency-input';

export default function TransferScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentAccount, loading } = useAppSelector(state => state.account);
  const [value, setValue] = useState<number | null>(0);

  function handleAddTransfer() {
    if (!currentAccount?.userId || !value) return;

    dispatch(addStatement({
      accountId: currentAccount.userId,
      statement: {
        createdAt: new Date().toISOString(),
        category: 'transfer',
        type: 'Transferência',
        value: -value
      }
    }));

    setValue(0);

    Alert.alert(
      'Sucesso',
      'Transferência realizada com sucesso',
      [{ onPress: () => router.dismissAll() }]
    );
  }

  return (
    <BackgroundGradient>
      <AppHeader
        style={{ paddingTop: 16, borderBottomWidth: 1 }}
        leftContent={<HeaderGoBackButton isModal />}
        rigthContent={<IconSwiftBankLogo />}
      />
      <View style={{ marginBottom: 64 }}>
        <Text style={transactionStyles.title}>Transferência</Text>
        <Text>
          Transfira dinheiro da sua conta Swift Bank de forma rápida e segura.
          Basta adicionar o valor que será enviado para outro destino.
        </Text>
      </View>
      <View style={{ marginBottom: 'auto' }}>
        <Text style={{ marginBottom: 8, fontWeight: 600 }}>
          Valor da transferência:
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
        onPress={handleAddTransfer}
        style={[
          transactionStyles.button,
          { backgroundColor: loading ? '#2c2c2c77' : '#2c2c2c' }
        ]}
        disabled={loading}
      >
        <Text style={transactionStyles.textButton}>Transferir</Text>
        {loading && (
          <ActivityIndicator
            size={'small'}
            style={{ position: 'absolute', right: 16, top: 18 }}
            color={'#FFF'}
          />
        )}
      </ButtonAction>
    </BackgroundGradient>
  );
}
