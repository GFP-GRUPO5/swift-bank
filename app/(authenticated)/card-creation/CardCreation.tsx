import { HeaderGoBackButton } from "@/shared/components/header-go-back-button/HeaderGoBackButton";
import { AppHeader } from "@/shared/components/app-header/AppHeader";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { AddNewCardForm } from "@/domains/cards/components/add-new-card-form/addNewCardForm";

export default function CardCreation() {
  return (
    <BackgroundGradient>
      <AppHeader
        style={{ paddingTop: 16, borderBottomWidth: 1 }}
        leftContent={<HeaderGoBackButton isModal />}
        centerContent='Novo Cartão'
      />
      <AddNewCardForm />
    </BackgroundGradient>
  )
}
