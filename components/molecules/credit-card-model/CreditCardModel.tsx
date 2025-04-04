import { View } from "react-native";
import { MasterCardSymbol } from "./MasterCardSymbol";
import { creditCardModelStyles } from "./CreditCardModel.styles";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export function CreditCardModel() {
  return (
    <View style={creditCardModelStyles.wrapper}>
      <MasterCardSymbol />
      <View style={creditCardModelStyles.contact}>
        <MaterialCommunityIcons name="contactless-payment" size={24} color="#FFF" />
      </View>
    </View>
  )
}