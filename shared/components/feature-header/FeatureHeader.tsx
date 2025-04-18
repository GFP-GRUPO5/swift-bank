import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, LinkProps } from "expo-router";
import { Text, View } from "react-native";
import { featureHeaderStyles } from "./FeatureHeader.styles";

interface Props extends LinkProps {
  title: string
}

export function FeatureHeader({ href, title }: Props) {
  return (
    <View style={featureHeaderStyles.header}>
      <Link href={href}>
        <AntDesign name="left" size={16} color="#2C2C2C" />
      </Link>
      <Text style={featureHeaderStyles.title}>{title}</Text>
    </View>
  )
}