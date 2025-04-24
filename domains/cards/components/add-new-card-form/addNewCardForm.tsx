import { useDispatch } from "react-redux";
import { Text, View } from "react-native";
import { addNewCardFormStyles } from "./addNewCardForm.styles";
import { ButtonAction } from "@/shared/components/button-action/ButtonAction";
import { TextField } from "@/shared/components/text-field/TextField";
import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { addCard, ICreditCard } from "@/redux/features/card/cardSlice";

const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 9);
};

export function AddNewCardForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [cardData, setCardData] = useState<Omit<ICreditCard, "id">>({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  const handleChange = (key: keyof typeof cardData, value: string) => {
    setCardData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const newCard: ICreditCard = {
        ...cardData,
        id: generateRandomId(),
      };
      await addDoc(collection(db, "cards"), newCard);
      dispatch(addCard(newCard));
      router.back();
    } catch (error) {
      console.error("Erro ao salvar cartão no Firestore:", error);
    }
  };

  return (
    <View style={addNewCardFormStyles.wrapper}>
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
