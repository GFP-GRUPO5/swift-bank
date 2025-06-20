import { AccountStatement } from "@/modules/account/presentation/components/account-statement";
import { Chart } from "@/modules/transactions/presentation/components/chart/Chart";
import { Card } from "@/shared/components/card/Card";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { AppBackgroundWithNavigation } from "@/shared/templates/app-background-with-navigation/AppBackgroundWithNavigation";
import { formatAsCurrency } from "@/shared/utils/format-as-currency/format-as-currency";
import { Text, View } from "react-native";
import { styles } from "./Debit.styles";

type AccountType = 'savings' | 'debit'

const accountMap: { [key in AccountType]: string } = {
  debit: 'Débito',
  savings: 'Poupança',
}

export default function DebitScreen() {
  const dispatch = useAppDispatch()
  const { currentAccount } = useAppSelector(state => state.account)

  return (
    <AppBackgroundWithNavigation>
      <View>
        <Text style={styles.accountTitle }>
          Conta {accountMap[currentAccount?.accountType!]}
        </Text>
      </View>
      <Text style={styles.balance}>
        Saldo: {formatAsCurrency(currentAccount?.currentAmount!)}
      </Text>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: 600 }}>Transações dos ultimos 30 dias</Text>
        <Chart />
      </View>

      <Card>
        <Text
          style={styles.accountTitle}
        >
          Extrato
        </Text>
        <AccountStatement statements={currentAccount?.statements ?? []} />
      </Card>
    </AppBackgroundWithNavigation>
  )
}
