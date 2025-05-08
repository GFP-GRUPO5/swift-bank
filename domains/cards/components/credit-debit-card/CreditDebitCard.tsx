import { cardDetailsStyle } from "@/domains/authentication/styles/CardDetails.styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  card: any
  currentCardId: string
  openDeleteDialog: (cardId: string) => void
  openSelectDialog: (cardId: string) => void
}

export function CreditDebitCard({ card, currentCardId, openDeleteDialog, openSelectDialog }: Props) {
  const isSelected = currentCardId === card.id;
  const selectedTextStyles = isSelected ? cardDetailsStyle.selectedText : ''

  return (
    <View
      key={card.id}
      style={[cardDetailsStyle.cardContainer, isSelected && cardDetailsStyle.selectedCard]}
    >
      <View style={{ flex: 1 }}>
        <Text style={[cardDetailsStyle.text, selectedTextStyles]}>{card.name}</Text>
        <Text style={[cardDetailsStyle.text, selectedTextStyles]}>
          •••• •••• •••• {card.number.slice(-4)}
        </Text>
        <View style={cardDetailsStyle.info}>
          <Text style={[cardDetailsStyle.text, ]}>{card.expiry}</Text>
          <Text style={[cardDetailsStyle.text, selectedTextStyles]}>{card.cvv}</Text>
        </View>
      </View>
      <View style={cardDetailsStyle.buttons}>
        <TouchableOpacity onPress={() => openSelectDialog(card.id)}>
          <MaterialIcons
            name={isSelected ? "radio-button-checked" : "radio-button-unchecked"}
            size={24}
            color={isSelected ? "#4CAF50" : "#2C2C2C"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openDeleteDialog(card.id)}>
          <MaterialIcons name="delete" size={24} color="#F4442E" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
