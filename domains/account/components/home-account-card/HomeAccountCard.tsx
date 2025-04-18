import { Link, Redirect, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { homeAccountCardStyles } from "./HomeAccountCard.styles";
import { PixIcon } from "../../../../shared/icons/PixIcon";
import { CardIcon } from "../../../../shared/icons/CardIcon";
import { QRCodeIcon } from "../../../../shared/icons/QRCodeIcon";
import { PhoneIcon } from "../../../../shared/icons/PhoneIcon";
import { Card } from "@/domains/cards/components/card/Card";

type TransactionNagivation = 'pix' | 'transfer' | 'qrcode' | 'recharge'

export function HomeAccountCard() {
  const router = useRouter()
  function handleTransactionNavigation(link: TransactionNagivation) {
    switch (link) {
      case 'pix':
        return router.push('/(authenticated)/pix/Pix')
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
      <Link href={'/account/Account'} style={homeAccountCardStyles.accountLink}>
        <View style={homeAccountCardStyles.accountLinkContent}>
          <Text>Conta</Text>
          <Entypo name="chevron-small-right" size={24} color="black" />
        </View>
      </Link>
      <Text style={homeAccountCardStyles.moneyAmount}>R$ 88,67</Text>
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