import { formatAsCurrency } from "@/shared/utils/format-as-currency/format-as-currency";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { format } from "date-fns";
import { Text, View } from "react-native";
import { IStatement } from "../../models/Account.dto";
import { transactionStyles } from "./TransactionListItem.styles";

interface Props {
  statementsLength: number
  index: number
  item: IStatement
}

export function TransactionListItem({ statementsLength, index, item }: Props) {
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
    <View
      style={{
        marginBottom: index === statementsLength - 1 ? 0 : 16,
        borderBottomWidth: index === statementsLength - 1 ? 0 : 1,
        paddingBottom: index === statementsLength - 1 ? 0 : 8,
      }}
    >
      <View style={[transactionStyles.transactionItem, { flexDirection: 'row'}]}>
        <View style={{ width: 40, alignItems: 'center' }}>
          {getTransactionIcon(item.type)}
        </View>

        <View style={{ flex: 1, flexDirection: 'row', gap: 16 }}>
          <Text style={{ textTransform: 'capitalize', fontWeight: '400' }}>
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
  )
}
