import { TextInput, TextInputProps } from "react-native";
import { textFieldStyles } from "./TextField.styles";

interface Props extends TextInputProps {}

export function TextField({ ...props }: Props) {
  return (
    <TextInput style={textFieldStyles.input} { ...props } />
  )
}
