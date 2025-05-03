import { AddNewCardForm } from "@/domains/cards/components/add-new-card-form/addNewCardForm";
import { AppHeader } from "@/shared/components/app-header/AppHeader";
import { HeaderGoBackButton } from "@/shared/components/header-go-back-button/HeaderGoBackButton";
import { IconSwiftBankLogo } from "@/shared/icons/IconSwiftBankLogo";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";

export default function CardCreation() {
  return (
    <BackgroundGradient>
      <AppHeader
        style={{ paddingTop: 16, borderBottomWidth: 1 }}
        leftContent={<HeaderGoBackButton isModal />}
        rigthContent={<IconSwiftBankLogo />}
      />
      <AddNewCardForm />
    </BackgroundGradient>
  )
}
