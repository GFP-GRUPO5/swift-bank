import { AppHeader } from '@/shared/presentation/components/app-header/AppHeader';
import { BackgroundGradient } from '@/shared/presentation/templates/background-gradient/BackgroundGradient';

export default function AccountScreen() {
  return (
    <BackgroundGradient>
      <AppHeader leftContent={<HeaderGoBackButton />} />
    </BackgroundGradient>
  );
}
