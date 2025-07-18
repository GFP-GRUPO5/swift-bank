import { AddNewCardForm } from '@/modules/cards/presentation/components/add-new-card-form/addNewCardForm';
import { AppHeader } from '@/shared/presentation/components/app-header/AppHeader';
import { HeaderGoBackButton } from '@/shared/presentation/components/header-go-back-button/HeaderGoBackButton';
import { IconSwiftBankLogo } from '@/shared/presentation/icons/IconSwiftBankLogo';
import { BackgroundGradient } from '@/shared/presentation/templates/background-gradient/BackgroundGradient';

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
  );
}
