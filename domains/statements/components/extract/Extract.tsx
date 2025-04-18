import AntDesign from "@expo/vector-icons/AntDesign";
import { Text, View } from "react-native";
import { extractStyles } from "./Extract.styles";
import { Card } from "../../../../cards/components/card/Card";
import { ButtonFunction } from "../../../../shared/components/button-function/ButtonFunction";

// TODO: 

export function Extract() {
    return (
        <Card>
            <View style={extractStyles.wrapper}>
                <Text style={extractStyles.title}>Conta</Text>
                <AntDesign name="right" size={16} color="#2C2C2C" />
            </View>
            <Text style={extractStyles.balance}>R$ 88,67</Text>
            <View style={extractStyles.buttonFunctionWrapper}>
                {/* <ButtonFunction href="/income" iconName="wallet" title="Receita" />
                <ButtonFunction href="/expense" iconName="money-bill-wave" title="Despesas" />
                <ButtonFunction href="/investment" iconName="piggy-bank" title="Investir" />
                <ButtonFunction href="/creditCard" iconName="credit-card" title="Cartões" /> */}
            </View>
        </Card>
    )
}
