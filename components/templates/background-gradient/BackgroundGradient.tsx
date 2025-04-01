import { LinearGradient } from "expo-linear-gradient";
import { backgroundGradientStyles } from "./BackgroundGradient.styles";
import { ReactNode } from "react";

interface Props{
    children:ReactNode;
}

export function BackgroundGradient({children}:Props) {
    return (
        <LinearGradient
            colors={["rgba(255, 186, 5, 1)", "rgba(255, 251, 240, 1)"]}
            style={backgroundGradientStyles.wrapper}
        >
            {children}
        </LinearGradient>
    )
}