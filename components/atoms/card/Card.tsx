import { ReactNode } from "react";
import { View } from "react-native";
import { cardStyles } from "./Card.styles";

interface Props {
  children: ReactNode
}

export function Card({ children }: Props) {
  return (
    <View style={cardStyles.wrapper}>
      {children}
    </View>
  )
}