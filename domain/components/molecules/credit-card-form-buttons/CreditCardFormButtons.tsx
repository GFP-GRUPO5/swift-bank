import { View } from "react-native";
import { ButtonAction } from "@/components/atoms/button-action/ButtonAction";
import { creditCardFormButtonsStyles } from "./CreditCardFormButtons.styles";

interface Props {
  isEditing: boolean;
  onEditToggle: () => void;
}

export function CreditCardFormButtons({ isEditing, onEditToggle }: Props) {
  return (
    <View style={creditCardFormButtonsStyles.buttons}>
      <ButtonAction
        label={isEditing ? "Salvar" : "Editar"}
        style={creditCardFormButtonsStyles.button}
        onPress={() => {onEditToggle()}}
      />
      <ButtonAction
        label="Bloquear"
        style={creditCardFormButtonsStyles.button}
      />
    </View>
  );
}