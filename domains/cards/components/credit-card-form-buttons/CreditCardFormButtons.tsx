import { View } from "react-native";
import { creditCardFormButtonsStyles } from "./CreditCardFormButtons.styles";
import { ButtonAction } from "../../../../shared/components/button-action/ButtonAction";

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
        onPress={() => { onEditToggle() }}
      />
      <ButtonAction
        label="Bloquear"
        style={creditCardFormButtonsStyles.button}
      />
    </View>
  );
}