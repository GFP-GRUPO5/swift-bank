import { Link } from "expo-router";
import { StyleProp, Text, TextStyle } from "react-native";
import { TextProps } from "react-native-svg";
import { textInputStyles } from "./TextLink.styles";


interface Props extends TextProps {
  label: string
  href: string
  textStyles?: StyleProp<TextStyle>
  linkStyles?: StyleProp<TextStyle>
}

export function TextLink({ href, label, textStyles, linkStyles, ...props }: Props) {
  return (
    <Link href={href as any} style={[linkStyles]}>
      <Text style={[textInputStyles.textLink, textStyles]} {...props}>{label}</Text>
    </Link>
  )
}