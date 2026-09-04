import {DEFAULT_STARFIELD_COUNT} from "@/types/amongus/Constants";
import StarfieldOverlayStar from "./StarfieldOverlayStar";
import {useElement} from "@editor/document/elements/useElement";
import GUID from "@shared/types/GUID";

export interface StarfieldOverlayProps {
    elementID: GUID;
}

export default function StarfieldOverlay(props: StarfieldOverlayProps) {
    const element = useElement(props.elementID);
    const count = element?.properties.starfieldCount ?? DEFAULT_STARFIELD_COUNT;
    const starArray = new Array(count).fill(null);

    if (!element || element.type !== "util-starfield")
        return null;
    return (
        <pixiContainer>
            {starArray.map((_, index) => (
                <StarfieldOverlayStar
                    key={index}
                    elementID={props.elementID}
                />
            ))}
        </pixiContainer>
    );
}
