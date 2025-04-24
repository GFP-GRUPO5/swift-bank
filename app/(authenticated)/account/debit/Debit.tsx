import { Card } from "@/domains/cards/components/card/Card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
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
  const { account } = useAppSelector(state => state.account)

  return (
    <AppBackgroundWithNavigation>
      <View>
        <Text style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
          Conta {accountMap[account?.accountType!]}
        </Text>
      </View>
      {/* <Card style={{ marginBottom: 32 }}> */}
      <Text style={{ fontSize: 20, marginBottom: 32 }}>
        Saldo: R$ {formatAsCurrency(account?.currentAmmount!)}
      </Text>
      {/* </Card> */}
      <View>
        <Text style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
          Extrato
        </Text>
        <Card>
          {
            !!account?.statements.length
              ? <FlatList
                data={account.statements}
                renderItem={({ item }) => (
                  <View key={`index-${item.id}`} style={{ marginBottom: 24 }}>
                    <View style={{
                      flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8
                    }}>
                      <Text style={{ textTransform: 'capitalize', fontWeight: 700 }}>
                        {item.category}
                      </Text>
                      <Text>{format(item.createdAt, 'dd/MM/yyyy')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text>{formatAsCurrency(item.value)}</Text>
                      <Text>{item.type}</Text>
                    </View>
                  </View>
                )}
              />
              : <Text style={{ textAlign: 'center' }}>Você ainda não fez nenhuma transação</Text>
          }
        </Card>
      </View>
    </AppBackgroundWithNavigation>
  )
}
