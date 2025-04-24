import { AppHeader } from "@/shared/components/app-header/AppHeader";
import { HeaderGoBackButton } from "@/shared/components/header-go-back-button/HeaderGoBackButton";
import { Logo } from "@/shared/components/logo/Logo";
import { ReactNode } from "react";
import { BackgroundGradient } from "../background-gradient/BackgroundGradient";

interface Props {
  children: ReactNode
}

export function AppBackgroundWithNavigation({ children }: Props) {
  return (
    <BackgroundGradient>
      <AppHeader leftContent={<HeaderGoBackButton />} centerContent={<Logo />} />
      {children}
    </BackgroundGradient>
  )
}