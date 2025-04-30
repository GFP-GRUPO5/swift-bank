import { Card } from "@/domains/cards/components/card/Card";
import { useAppSelector } from "@/redux/hooks";
import Entypo from "@expo/vector-icons/Entypo";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { CardIcon } from "../../../../shared/icons/CardIcon";
import { PhoneIcon } from "../../../../shared/icons/PhoneIcon";
import { PixIcon } from "../../../../shared/icons/PixIcon";
import { QRCodeIcon } from "../../../../shared/icons/QRCodeIcon";
import { homeAccountCardStyles } from "./HomeAccountCard.styles";

type TransactionNagivation = 'pix' | 'transfer' | 'qrcode' | 'recharge'

export function HomeAccountCard() {
  const router = useRouter()
  const { currentAccount, loading  } = useAppSelector(state => state.account)

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
          <Entypo name="chevron-small-right" size={24} color="black" />
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
            <PixIcon />
          </View>
          <Text>Pix</Text>
        </Pressable>

        <Pressable
          style={homeAccountCardStyles.transactionPressableItem}
          onPress={() => handleTransactionNavigation('transfer')}
        >
          <View style={homeAccountCardStyles.transactionIconContainer}>
            <CardIcon />
          </View>
          <Text>Transferir</Text>
        </Pressable>

        <Pressable
          style={homeAccountCardStyles.transactionPressableItem}
          onPress={() => handleTransactionNavigation('qrcode')}
        >
          <View style={homeAccountCardStyles.transactionIconContainer}>
            <QRCodeIcon />
          </View>
          <Text>QR Code</Text>
        </Pressable>

        <Pressable
          style={homeAccountCardStyles.transactionPressableItem}
          onPress={() => handleTransactionNavigation('recharge')}
        >
          <View style={homeAccountCardStyles.transactionIconContainer}>
            <PhoneIcon />
          </View>
          <Text>Recarga</Text>
        </Pressable>
      </View>
    </Card>
  )
}