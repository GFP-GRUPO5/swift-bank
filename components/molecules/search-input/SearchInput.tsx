import { TextInput } from "@/components/atoms/text-input/TextInput";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { View } from "react-native";
import { searchInputStyles } from "./SearchInput.styles";

export function SearchInput() {
  return (
    <View style={searchInputStyles.wrapper}>
      <TextInput style={searchInputStyles.input} />
      <View style={searchInputStyles.iconWrapper}>
        <FontAwesome6
          name="magnifier"
          size={14}
          color="black"
        />
      </View>
    </View>
  )
}