import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link, LinkProps } from "expo-router";
import { Text, View } from "react-native";
import { buttonFunctionStyles } from "./ButtonFunction.styles";

interface Props extends LinkProps {
    title: string;
    iconName: string;
}

export function ButtonFunction({ href, iconName, title }: Props) {
    return (
        <Link href={href} >
            <View style={buttonFunctionStyles.wrapper}>
                <View style={buttonFunctionStyles.icon}>
                    <FontAwesome6 name={iconName} size={24} color={"#555555"} />
                </View>
                <Text>{title}</Text>
            </View>
        </Link>
    )
}