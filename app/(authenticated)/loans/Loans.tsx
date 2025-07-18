import { AppHeader } from '@/shared/presentation/components/app-header/AppHeader';
import { HeaderGoBackButton } from '@/shared/presentation/components/header-go-back-button/HeaderGoBackButton';
import { IconSwiftBankLogo } from '@/shared/presentation/icons/IconSwiftBankLogo';
import { BackgroundGradient } from '@/shared/presentation/templates/background-gradient/BackgroundGradient';
import { Text, View } from 'react-native';

export default function LoansScreen() {
  return (
    <BackgroundGradient>
      <AppHeader
        style={{ paddingTop: 16, borderBottomWidth: 1 }}
        leftContent={<HeaderGoBackButton />}
        rigthContent={<IconSwiftBankLogo />}
      />
      <View>
        <Text>Empréstimos</Text>
      </View>
    </BackgroundGradient>
  );
}
