import { Card } from "@/domains/cards/components/card/Card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AccountStatement } from "@/shared/components/account-statement";
import { AppBackgroundWithNavigation } from "@/shared/templates/app-background-with-navigation/AppBackgroundWithNavigation";
import { formatAsCurrency } from "@/shared/utils/format-as-currency/format-as-currency";
import { format } from "date-fns";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

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
      {/* <Card style={{ marginBottom: 32 }}> */}
      <Text style={{ fontSize: 20, marginBottom: 32 }}>
        Saldo: {formatAsCurrency(currentAccount?.currentAmount!)}
      </Text>
      {/* </Card> */}
     <AccountStatement statements={currentAccount?.statements ?? []} />
    </AppBackgroundWithNavigation>
  )
}
