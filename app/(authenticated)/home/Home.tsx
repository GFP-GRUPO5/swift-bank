import { HomeHeader } from "@/domain/components/molecules/home-header/HomeHeader";
import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient";
import { HomeAccountCard } from "@/domain/components/organism/home-account-card/HomeAccountCard";

export default function HomeScreen() {
  return (
    <BackgroundGradient>
      <HomeHeader />
      <HomeAccountCard />
    </BackgroundGradient>
  )
}
