import { Card } from "@/domains/cards/components/card/Card";
import { useAppSelector } from "@/redux/hooks";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { homeAccountCardStyles } from "./HomeAccountCard.styles";

type TransactionNagivation = 'pix' | 'transfer' | 'qrcode' | 'recharge'

export function HomeAccountCard() {
  const router = useRouter()
  const { currentAccount, loading } = useAppSelector(state => state.account)

  function handleTransactionNavigation(link: TransactionNagivation) {
    switch (link) {
      case 'pix':
        return router.push('/(authenticated)/pix')
      case 'qrcode':
        return router.push('/(authenticated)/qr-code/QRCode')
      case "transfer":
        return router.push('/(authenticated)/transfer/Transfer')
      case "recharge":
        return router.push('/(authenticated)/recharge/Recharge')
      default:
        throw new Error('Link not found')
    }
  }

  return (
    <Card>
      <Link
        href={`/account/debit/Debit`}
        style={homeAccountCardStyles.accountLink}
      >
        <View style={homeAccountCardStyles.accountLinkContent}>
          <Text>Conta</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#2C2C2C" />
        </View>
      </Link>
      <Text style={homeAccountCardStyles.moneyAmount}>
        {loading
          ? <ActivityIndicator size={'small'} />
          : `R$ ${(currentAccount?.currentAmount ?? 0).toLocaleString(
            'pt-BR',
            {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}`
        }
      </Text>
      <View style={homeAccountCardStyles.transactionsContainer}>

        <Pressable
          style={homeAccountCardStyles.transactionPressableItem}
          onPress={() => handleTransactionNavigation('pix')}
        >
          <View style={homeAccountCardStyles.transactionIconContainer}>
            <MaterialIcons name="pix" size={32} color="#2C2C2C" />
          </View>
          <Text>Pix</Text>
        </Pressable>

        <Pressable
          style={homeAccountCardStyles.transactionPressableItem}
          onPress={() => handleTransactionNavigation('transfer')}
        >
          <View style={homeAccountCardStyles.transactionIconContainer}>
            <MaterialIcons name="paid" size={32} color="#2C2C2C" />
          </View>
          <Text>Transferir</Text>
        </Pressable>

        <Pressable
          style={homeAccountCardStyles.transactionPressableItem}
          onPress={() => handleTransactionNavigation('qrcode')}
        >
          <View style={homeAccountCardStyles.transactionIconContainer}>
            <MaterialIcons name="qr-code" size={32} color="#2C2C2C" />
          </View>
          <Text>QR Code</Text>
        </Pressable>

        <Pressable
          style={homeAccountCardStyles.transactionPressableItem}
          onPress={() => handleTransactionNavigation('recharge')}
        >
          <View style={homeAccountCardStyles.transactionIconContainer}>
            <MaterialIcons name="account-balance-wallet" size={32} color="#2C2C2C" />
          </View>
          <Text>Depósito</Text>
        </Pressable>
      </View>
    </Card>
  )
}