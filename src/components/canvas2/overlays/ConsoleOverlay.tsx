import GUID from "../../../types/common/GUID";
import {
    DEFAULT_CONSOLE_RANGE,
    DEFAULT_SPORE_RANGE,
    UNITY_SCALE,
    VENT_CONSOLE_RANGE
} from "@/types/amongus/Constants";
import getIsConsole from "../../../utils/map/getIsConsole";
import {useElement} from "@/hooks/elements/useElement";

export interface ConsoleOverlayProps {
    elementID: GUID;
}

export default function ConsoleOverlay(props: ConsoleOverlayProps) {
    const element = useElement(props.elementID);

    const isDoor = element?.type.startsWith("sab-door");
    const isSpore = element?.type === "util-spore";
    const isVent = element?.type.startsWith("util-vent");
    const radius = element?.properties.range ?? (
        isVent ? VENT_CONSOLE_RANGE :
            isSpore ? DEFAULT_SPORE_RANGE :
                DEFAULT_CONSOLE_RANGE
    );

    const angle = element?.properties.onlyFromBelow ? Math.PI : Math.PI * 2;
    const isConsole = getIsConsole(element?.type || "") || isDoor;

    if (!element || !isConsole)
        return null;
    return (
        <pixiGraphics
            eventMode={"none"}
            draw={(g) => {
                g.clear();

                g.beginPath();
                g.arc(0, 0, radius * UNITY_SCALE, 0, angle, false)
                    .fill({color: 0xffaa00, alpha: 0.4})
                    .stroke({color: 0xffaa00, width: 4, alignment: 0.5});
                g.closePath();
                g.stroke();
            }}
        />
    );
}