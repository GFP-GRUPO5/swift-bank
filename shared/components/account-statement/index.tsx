import { formatAsCurrency } from "@/shared/utils/format-as-currency/format-as-currency";
import { format } from "date-fns";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { TransactionDTO } from "@/domains/transactions/models/Transaction.dto"; // ajuste conforme sua tipagem real

interface AccountStatementProps {
  statements: TransactionDTO[];
}

export function AccountStatement({ statements }: AccountStatementProps) {
  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '600',
          marginBottom: 16,
        }}
      >
        Extrato
      </Text>
      <View style={{ maxHeight: 300 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={statements}
          ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Você ainda não fez nenhuma transação</Text>}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => (
            <View
              style={{
                marginBottom: index === statements.length ? 0 : 16,
                borderBottomWidth: index === statements.length ? 0 : 1,
                paddingBottom: index === statements.length ? 0 : 8,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <Text style={{ textTransform: 'capitalize', fontWeight: '700' }}>
                  {item.categoryId}
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
      </View>
    </View>
  );
}
