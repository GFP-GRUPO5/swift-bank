import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: ReactNode
  style?: ViewStyle
}

const colorsGradient: readonly [string, string, ...string[]] = ["rgba(255, 186, 5, 1)", "rgba(255, 251, 240, 1)"];

export function BackgroundGradient({ children, style }: Props) {
  return (
    <LinearGradient colors={colorsGradient} style={[{ flex: 1 }, style]}>
      <SafeAreaView
        style={{
          flex: 1,
          height: "100%",
          paddingHorizontal: 16,
        }}
      >
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
}