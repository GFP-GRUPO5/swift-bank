import { ICreditCard } from "@/redux/features/card/cardSlice";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Text, View } from "react-native";
import { creditCardModelStyles } from "./CreditCardModel.styles";
import { MasterCardSymbol } from "./MasterCardSymbol";

interface Props {
  card: ICreditCard | null | undefined,
}

export function CreditCardModel({ card }: Props) {

  if (!card) {
    return null
  }

  const lastFourDigits = card.number?.slice(-4) || "****";

  return (
    <View style={creditCardModelStyles.wrapper}>
      <MasterCardSymbol />
      <View style={creditCardModelStyles.data}>
        <MaterialCommunityIcons name="contactless-payment" size={24} color="#FFF" style={creditCardModelStyles.contact} />
        <Text style={creditCardModelStyles.text}>**** **** **** {lastFourDigits}</Text>
        <Text style={creditCardModelStyles.text}>{card?.name}</Text>
        <View style={creditCardModelStyles.infos}>
          <Text style={creditCardModelStyles.text}>{card?.expiry}</Text>
          <Text style={creditCardModelStyles.text}>{card?.cvv}</Text>
        </View>
      </View>
    </View>
  )
}