import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: ReactNode;
}

const colorsGradient: readonly [string, string, ...string[]] = ["rgba(255, 186, 5, 1)", "rgba(255, 251, 240, 1)"]

export function BackgroundGradient({ children }: Props) {
  return (
    <LinearGradient
      colors={colorsGradient}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          height: '100%',
          paddingHorizontal: 16
        }}
      >
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
}
