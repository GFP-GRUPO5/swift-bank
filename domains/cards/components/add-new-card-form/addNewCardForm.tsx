import { createNewCard } from "@/redux/features/card/thunk/create-new-card";
import { useAppDispatch } from "@/redux/hooks";
import { ButtonAction } from "@/shared/components/button-action/ButtonAction";
import { TextField } from "@/shared/components/text-field/TextField";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { ICreditCard } from "../../models/card";
import { addNewCardFormStyles } from "./addNewCardForm.styles";

export function AddNewCardForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [cardData, setCardData] = useState<ICreditCard>({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    id: ""
  });

  const handleChange = (key: keyof typeof cardData, value: string) => {
    setCardData((state: any) => ({ ...state, [key]: value }));
  };

  function handleSubmit() {
    dispatch(createNewCard({
      id: cardData.id,
      number: cardData.number,
      name: cardData.name,
      cvv: cardData.cvv,
      expiry: cardData.expiry,
    }))
    router.back();
  };

  return (
    <View style={addNewCardFormStyles.wrapper}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>
        Adicione um novo cartão
      </Text>
      <View>
        <Text style={addNewCardFormStyles.label}>Nome</Text>
        <TextField
          value={cardData.name || ""}
          onChangeText={(value) => handleChange("name", value)}
          placeholder="Nome do titular"
        />
      </View>

      <View>
        <Text style={addNewCardFormStyles.label}>Número</Text>
        <TextField
          value={cardData.number || ""}
          onChangeText={(value) => handleChange("number", value)}
          keyboardType="numeric"
          placeholder="Número do cartão"
        />
      </View>

      <View style={addNewCardFormStyles.info}>
        <View style={addNewCardFormStyles.fieldContainer}>
          <Text style={addNewCardFormStyles.label}>Validade</Text>
          <TextField
            value={cardData.expiry || ""}
            onChangeText={(value) => handleChange("expiry", value)}
            placeholder="MM/AA"
          />
        </View>

        <View style={addNewCardFormStyles.fieldContainer}>
          <Text style={addNewCardFormStyles.label}>CVV</Text>
          <TextField
            value={cardData.cvv || ""}
            onChangeText={(value) => handleChange("cvv", value)}
            keyboardType="numeric"
            placeholder="CVV"
          />
        </View>
      </View>

      <ButtonAction
        style={addNewCardFormStyles.button}
        label="Adicionar"
        onPress={handleSubmit}
      />
    </View>
  );
}
