import { HeaderGoBackButton } from "@/shared/components/header-go-back-button/HeaderGoBackButton";
import { AppHeader } from "@/shared/components/app-header/AppHeader";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { ButtonAction } from "@/shared/components/button-action/ButtonAction";

export default function QRCodeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <BackgroundGradient>
      <AppHeader leftContent={<HeaderGoBackButton />} centerContent='QR Code' />

      <CameraView
        facing={facing}
        style={{ flex: 1, width: '100%', height: '50%', alignItems: 'center', borderRadius: 8 }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
    </BackgroundGradient>
  )
}
