import { useState } from "react";
import { ButtonAction } from "@/components/atoms/button-action/ButtonAction";
import { Card } from "@/components/atoms/card/Card";
import { CreditCardModel } from "@/components/molecules/credit-card-model/CreditCardModel";
import { BackgroundGradient } from "@/components/templates/background-gradient/BackgroundGradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function CreditCard() {
    const [isEditing, setIsEditing] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const [name, setName] = useState("Rodrigo Silva Harder");
    const [number, setNumber] = useState("1111 2222 3333 4444");
    const [validity, setValidity] = useState("11/31");
    const [cvv, setCvv] = useState("111");
    const [brand, setBrand] = useState("Mastercard");
    const [type, setType] = useState("Débito e crédito");

    const renderField = (
        label: string,
        value: string,
        setValue: (v: string) => void,
        fieldName: string,
        keyboardType: "default" | "numeric" = "default",
        secure = false
    ) => (
        <View>
            <Text style={creditCardStyle.label}>{label}</Text>
            {isEditing ? (
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    style={[
                        creditCardStyle.input,
                        focusedField === fieldName && creditCardStyle.inputFocused
                    ]}
                    onFocus={() => setFocusedField(fieldName)}
                    onBlur={() => setFocusedField(null)}
                    keyboardType={keyboardType}
                    secureTextEntry={secure}
                />
            ) : (
                <Text style={creditCardStyle.value}>{value}</Text>
            )}
        </View>
    );

    return (
        <GestureHandlerRootView>
            <BackgroundGradient>
                <View style={creditCardStyle.header}>
                    <Link href="/">
                        <AntDesign name="left" size={16} color="#2C2C2C" />
                    </Link>
                    <Text style={creditCardStyle.title}>Meus cartões</Text>
                </View>

                <CreditCardModel />

                <Card>
                    <View style={creditCardStyle.wrapper}>
                        {renderField("Nome", name, setName, "name")}
                        {renderField("Número", number, setNumber, "number", "numeric")}
                        <View style={creditCardStyle.info}>
                            {renderField("Validade", validity, setValidity, "validity")}
                            {renderField("CVV", cvv, setCvv, "cvv", "numeric", true)}
                        </View>
                        <View style={creditCardStyle.info}>
                            {renderField("Bandeira", brand, setBrand, "brand")}
                            {renderField("Função", type, setType, "type")}
                        </View>
                    </View>
                </Card>

                <View style={creditCardStyle.buttons}>
                    <ButtonAction
                        label={isEditing ? "Salvar" : "Editar"}
                        style={creditCardStyle.button}
                        onPress={() => setIsEditing(prev => !prev)}
                    />
                    <ButtonAction label="Bloquear" style={creditCardStyle.button} />
                </View>
            </BackgroundGradient>
        </GestureHandlerRootView>
    );
}

const creditCardStyle = StyleSheet.create({
    wrapper: {
        gap: 16
    },
    label: {
        fontSize: 14,
        color: "#8A8A8A",
        marginBottom: 4
    },
    value: {
        fontSize: 16,
        color: "#2C2C2C",
        paddingVertical: 4
    },
    input: {
        fontSize: 16,
        color: "#2C2C2C",
        backgroundColor: "#F4F4F4",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E0E0E0"
    },
    inputFocused: {
        backgroundColor: "#EFEFEF",
        borderColor: "#2C2C2C"
    },
    info: {
        flexDirection: "row",
        gap: 32
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2C2C2C"
    },
    header: {
        gap: 16
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 24
    },
    button: {
        backgroundColor: "#2C2C2C",
        width: "40%",
        paddingVertical: 12,
        borderRadius: 24
    }
});
