import { AppHeader } from "@/shared/components/app-header/AppHeader";
import { HeaderGoBackButton } from "@/shared/components/header-go-back-button/HeaderGoBackButton";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";

export default function AccountScreen() {
  return (
    <BackgroundGradient>
      <AppHeader leftContent={<HeaderGoBackButton />} />
    </BackgroundGradient>
  )
}
