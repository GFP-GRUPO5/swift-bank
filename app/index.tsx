import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Extract } from "@/components/molecules/extract/Extract";
import { BackgroundGradient } from "@/components/templates/background-gradient/BackgroundGradient";

export default function Index() {
  return (
    <GestureHandlerRootView>
      <BackgroundGradient>
        <Extract />
      </BackgroundGradient>
    </GestureHandlerRootView>
  );
}
