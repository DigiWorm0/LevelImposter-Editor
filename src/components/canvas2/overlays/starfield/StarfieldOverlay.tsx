import GUID from "../../../../types/generic/GUID";
import {useElementValue} from "../../../../hooks/elements/useElements";
import {
    DEFAULT_STARFIELD_COUNT,
    DEFAULT_STARFIELD_HEIGHT,
    DEFAULT_STARFIELD_LENGTH,
    UNITY_SCALE
} from "../../../../types/generic/Constants";
import StarfieldOverlayStar from "./StarfieldOverlayStar";

export interface StarfieldOverlayProps {
    elementID: GUID;
}

export default function StarfieldOverlay(props: StarfieldOverlayProps) {
    const element = useElementValue(props.elementID);

    const height = element?.properties.starfieldHeight ?? DEFAULT_STARFIELD_HEIGHT;
    const length = element?.properties.starfieldLength ?? DEFAULT_STARFIELD_LENGTH;
    const count = element?.properties.starfieldCount ?? DEFAULT_STARFIELD_COUNT;

    const starArray = new Array(count).fill(null);

    if (!element || element.type !== "util-starfield")
        return null;
    return (
        <>
            <pixiGraphics
                eventMode={"none"}
                draw={(g) => {
                    g.clear();

                    g.beginPath();
                    g.rect(0,
                        -height * UNITY_SCALE * 0.5,
                        length * UNITY_SCALE,
                        height * UNITY_SCALE)
                        .stroke({color: 0xffaa00, width: 4, alignment: 0.5});

                    g.closePath();
                    g.stroke();
                }}
            />

            {starArray.map((_, index) => (
                <StarfieldOverlayStar
                    key={index}
                    elementID={props.elementID}
                />
            ))}
        </>
    );
}
