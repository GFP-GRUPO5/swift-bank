import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateCard } from "@/redux/features/card/cardSlice";
import { creditCardFormFieldsStyles } from "./CreditCardFormFields.styles";
import { TextField } from "../../atoms/text-field/TextField";
import { Card } from "../../atoms/card/Card";

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