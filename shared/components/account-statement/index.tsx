import { TransactionListItem } from "@/domains/account/components/transaction-list-item/TransactionListItem";
import { IStatement } from "@/domains/account/models/Account.dto";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

interface AccountStatementProps {
  statements: IStatement[];
}

export function AccountStatement({ statements }: AccountStatementProps) {
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
            <TransactionListItem
              item={item}
              index={index}
              statementsLength={statements.length}
            />
          )}
        />
      </View>
    </View>
  );
}
