import { ReactNode } from "react";
import { View, ViewProps } from "react-native";
import { cardStyles } from "./Card.styles";

interface Props extends ViewProps {
  children: ReactNode
}

export function Card({ children, style, ...props }: Props) {
  return (
    <View style={[style, cardStyles.wrapper]} {...props}>
      {children}
    </View>
  )
}