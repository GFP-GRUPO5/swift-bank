import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BackgroundGradient } from "@/components/templates/background-gradient/BackgroundGradient";
import { CreditCardModel } from "@/components/molecules/credit-card-model/CreditCardModel";
import { FeatureHeader } from "@/components/atoms/feature-header/FeatureHeader";
import { CreditCardForm } from "@/components/organism/credit-card-form/CreditCardForm";

export default function CreditCard() {

    return (
        <GestureHandlerRootView>
            <BackgroundGradient>
                <FeatureHeader href="/" title="Meus cartões" />
                <CreditCardModel />
                <CreditCardForm />
            </BackgroundGradient>
        </GestureHandlerRootView>
    );
}
