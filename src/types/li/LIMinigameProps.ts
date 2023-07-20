import LIColor from "./LIColor";

export default interface LIMinigameProps {
    reactorColorGood?: LIColor;
    reactorColorBad?: LIColor;
    lightsColorOn?: LIColor;
    lightsColorOff?: LIColor;
    fuelColor?: LIColor;
    fuelBgColor?: LIColor;
    
    isStarfieldEnabled?: boolean;
}

export type MaybeLIMinigameProps = LIMinigameProps | undefined;