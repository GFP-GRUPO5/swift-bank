import { Card } from "@/domains/cards/components/card/Card";
import { Chart } from "@/domains/transactions/components/chart/Chart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AccountStatement } from "@/shared/components/account-statement";
import { AppBackgroundWithNavigation } from "@/shared/templates/app-background-with-navigation/AppBackgroundWithNavigation";
import { formatAsCurrency } from "@/shared/utils/format-as-currency/format-as-currency";
import { Text, View } from "react-native";

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
        <Text style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
          Conta {accountMap[currentAccount?.accountType!]}
        </Text>
      </View>
      <Text style={{ fontSize: 20, marginBottom: 32 }}>
        Saldo: {formatAsCurrency(currentAccount?.currentAmount!)}
      </Text>
      <View>
        <Chart />
      </View>

      <Card>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            marginBottom: 16,
          }}
        >
          Extrato
        </Text>
        <AccountStatement statements={currentAccount?.statements ?? []} />
      </Card>
    </AppBackgroundWithNavigation>
  )
}
