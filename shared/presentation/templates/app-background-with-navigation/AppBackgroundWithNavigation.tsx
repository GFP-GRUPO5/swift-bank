import { AppHeader } from '@/shared/presentation/components/app-header/AppHeader';
import { HeaderGoBackButton } from '@/shared/presentation/components/header-go-back-button/HeaderGoBackButton';
import { IconSwiftBankLogo } from '@/shared/presentation/icons/IconSwiftBankLogo';
import { ReactNode } from 'react';
import { BackgroundGradient } from '../background-gradient/BackgroundGradient';

interface Props {
  children: ReactNode;
}

export function AppBackgroundWithNavigation({ children }: Props) {
  return (
    <BackgroundGradient>
      <AppHeader
        style={{ paddingTop: 16, borderBottomWidth: 1 }}
        leftContent={<HeaderGoBackButton />}
        rigthContent={<IconSwiftBankLogo />}
      />
      {children}
    </BackgroundGradient>
  );
}
