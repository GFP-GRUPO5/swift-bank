import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { scrollViewWrapperStyles } from "./ScrollViweWrapper.styles";

interface Props {
  children: ReactNode
}

export function ScrollViewWrapper({ children }: Props) {
  return (
    <ScrollView>
      <View style={scrollViewWrapperStyles.view}>
        { children }
      </View>
    </ScrollView>
  )
}
