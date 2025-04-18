import { HeaderGoBackButton } from "@/shared/components/header-go-back-button/HeaderGoBackButton";
import { AppHeader } from "@/shared/components/app-header/AppHeader";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { Text, View } from "react-native";
import { Camera } from 'expo-camera'
import { useRef, useState } from "react";

export default function LoansScreen() {
  return (
    <BackgroundGradient>
      <AppHeader leftContent={<HeaderGoBackButton />} />
      <View>
      </View>
    </BackgroundGradient>
  )
}
