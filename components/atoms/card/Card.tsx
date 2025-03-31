import { ReactNode } from "react";
import { View } from "react-native";

interface Props {
  children: ReactNode
}

export function Card({ children }: Props) {
  return (
    <View>
      {children}
    </View>
  )
}