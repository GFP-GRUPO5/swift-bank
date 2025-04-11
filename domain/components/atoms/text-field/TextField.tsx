import { TextInput, TextInputProps } from "react-native";
import { textFieldStyles } from "./TextField.styles";

interface Props extends TextInputProps {}

export function TextField({ style, ...props }: Props) {
  return (
    <TextInput style={[style, textFieldStyles.input]} { ...props } />
  )
}
