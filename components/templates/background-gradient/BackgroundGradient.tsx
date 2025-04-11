import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { backgroundGradientStyles } from "./BackgroundGradient.styles";

interface Props {
  children: ReactNode;
}

export function BackgroundGradient({ children }: Props) {
  return (
    <SafeAreaView>
      <LinearGradient
        colors={["rgba(255, 186, 5, 1)", "rgba(255, 251, 240, 1)"]}
        style={backgroundGradientStyles.wrapper}
      >
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
}
