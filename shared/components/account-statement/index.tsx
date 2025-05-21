import { IStatement } from "@/domains/account/models/Account.dto";
import { formatAsCurrency } from "@/shared/utils/format-as-currency/format-as-currency";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { format } from "date-fns";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

interface AccountStatementProps {
  statements: IStatement[];
}

export function AccountStatement({ statements }: AccountStatementProps) {
  function getTransactionIcon(type: string) {
    switch (type) {
      case 'Pix':
        return <MaterialIcons name="compare-arrows" size={24} color="blue" />;
      case 'Transferência':
        return <MaterialIcons name="arrow-upward" size={24} color="red" />;
      case 'Depósito':
        return <MaterialIcons name="arrow-downward" size={24} color="green" />
      default:
        return <MaterialIcons name="help-outline" size={24} color="gray" />;
    }
  }

  return (
    <View>
      <View style={{ maxHeight: 300 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={statements}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center' }}>
              Você ainda não fez nenhuma transação
            </Text>
          }
          keyExtractor={(item) => `${item.createdAt}-${Math.random() * 10000000000}`}
          renderItem={({ item, index }) => (
            <View
              style={{
                marginBottom: index === statements.length - 1 ? 0 : 16,
                borderBottomWidth: index === statements.length - 1 ? 0 : 1,
                paddingBottom: index === statements.length - 1 ? 0 : 8,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <View style={{ width: 40, alignItems: 'center' }}>
                  {getTransactionIcon(item.type)}
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ textTransform: 'capitalize', fontWeight: '700' }}>
                    {item.type}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {formatAsCurrency(item.value)}
                  </Text>
                </View>

                <View>
                  <Text>{format(item.createdAt, 'dd/MM/yyyy')}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
