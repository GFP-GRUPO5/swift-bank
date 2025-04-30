import { Text, View } from "react-native";
import { MasterCardSymbol } from "./MasterCardSymbol";
import { creditCardModelStyles } from "./CreditCardModel.styles";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ICreditCard } from "@/redux/features/card/cardSlice";

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
      <View style={creditCardModelStyles.contact}>
        <MaterialCommunityIcons name="contactless-payment" size={24} color="#FFF" />
        <Text>**** **** **** {lastFourDigits}</Text>
        <Text>{card?.name}</Text>
        <Text>{card?.cvv}</Text>
      </View>
    </View>
  )
}