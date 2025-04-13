import { HeaderGoBackButton } from "@/domain/components/atoms/header-go-back-button/HeaderGoBackButton";
import { AppHeader } from "@/domain/components/molecules/app-header/AppHeader";
import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient";
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
