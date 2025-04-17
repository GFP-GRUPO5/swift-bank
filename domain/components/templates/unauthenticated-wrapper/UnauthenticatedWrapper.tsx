import { Text, View } from "react-native";
import { BackgroundGradient } from "../background-gradient/BackgroundGradient";
import { forgotPasswordStyles } from "@/styles/ForgotPassword.styles";
import { SwiftBankLogo } from "../../icons/swiftBankLogo";
import { ReactNode } from "react";

interface Props {
  title: string
  subtitle: string
  children: ReactNode
}

export function UnauthenticatedWrapper({ title, subtitle, children }: Props) {
  return (
    <BackgroundGradient style={{ flex: 1 }}>
      <View style={forgotPasswordStyles.logo}>
        <SwiftBankLogo />
      </View>
      <Text style={forgotPasswordStyles.title}>
        {title}
      </Text>
      <Text style={forgotPasswordStyles.subtitle}>
        {subtitle}
      </Text>
      {children}
    </BackgroundGradient>
  )
}