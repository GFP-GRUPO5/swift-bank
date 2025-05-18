import { AppHeader } from "@/shared/components/app-header/AppHeader";
import { HeaderGoBackButton } from "@/shared/components/header-go-back-button/HeaderGoBackButton";
import { IconSwiftBankLogo } from "@/shared/icons/IconSwiftBankLogo";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from "react";
import { styles } from "./QRCode.styles";

export default function QRCodeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <BackgroundGradient>
      <AppHeader
        style={{ paddingTop: 16, borderBottomWidth: 1 }}
        leftContent={<HeaderGoBackButton isModal />}
        rigthContent={<IconSwiftBankLogo />}
      />

      <CameraView
        facing={facing}
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />
    </BackgroundGradient>
  )
}
