import GUID from "../../../../types/common/GUID";
import {useElementValue} from "../../../../hooks/elements/useElements";
import {DEFAULT_STARFIELD_COUNT} from "../../../../types/amongus/Constants";
import StarfieldOverlayStar from "./StarfieldOverlayStar";

export interface StarfieldOverlayProps {
    elementID: GUID;
}

export default function StarfieldOverlay(props: StarfieldOverlayProps) {
    const element = useElementValue(props.elementID);
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
