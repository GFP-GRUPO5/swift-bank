import { Text, View } from "react-native";
import { ReactNode } from "react";
import { SwiftBankLogo } from "@/shared/icons/swiftBankLogo";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { forgotPasswordStyles } from "../../styles/ForgotPassword.styles";

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