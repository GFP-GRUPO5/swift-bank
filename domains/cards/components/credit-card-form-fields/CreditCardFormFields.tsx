import { updateCard } from "@/redux/features/card/card-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { Card } from "../../../../cards/components/card/Card";
import { TextField } from "../../../../shared/components/text-field/TextField";
import { creditCardFormFieldsStyles } from "./CreditCardFormFields.styles";

interface Props {
  isEditing: boolean;
}

export function CreditCardFormFields({ isEditing }: Props) {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => state.card.cards[0]);

  const handleChange = (key: keyof typeof card, value: string) => {
    if (!card?.id) return;
    dispatch(updateCard({ id: card.id, [key]: value }));
  };

  const renderField = (
    label: string,
    key: keyof typeof card,
    keyboardType: "default" | "numeric" = "default"
  ) => (
    <View>
      <Text style={creditCardFormFieldsStyles.label}>{label}</Text>
      {isEditing ? (
        <TextField
          value={card?.[key] || ""}
          onChangeText={(value) => handleChange(key, value)}
          keyboardType={keyboardType}
        />
      ) : (
        <Text style={creditCardFormFieldsStyles.value}>{card?.[key] || ""}</Text>
      )}
    </View>
  );

  return (
    <Card>
      <Animated.View style={creditCardFormFieldsStyles.wrapper}>
        {renderField("Nome", "name")}
        {renderField("Número", "number", "numeric")}
        <View style={creditCardFormFieldsStyles.info}>
          {renderField("Validade", "expiry")}
          {renderField("CVV", "cvv", "numeric")}
        </View>
        <View style={creditCardFormFieldsStyles.info}>
          {renderField("Bandeira", "brand")}
          {renderField("Função", "type")}
        </View>
      </Animated.View>
    </Card>
  );
}