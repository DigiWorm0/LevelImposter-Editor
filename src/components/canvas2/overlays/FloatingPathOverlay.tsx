import React from "react";
import GUID from "@shared/types/GUID";
import {DEFAULT_FLOATING_HEIGHT, UNITY_SCALE} from "@/types/amongus/Constants";
import useMapElementRef from "../../../hooks/canvas/useMapElementRef";
import TickingGraphics from "../common/TickingGraphics";
import getOffsetFromElement from "../../../utils/canvas/getOffsetFromElement";
import {useElement} from "@/hooks/elements/useElement";

export interface FloatingOverlayProps {
    elementID: GUID;
}

export default function FloatingPathOverlay(props: FloatingOverlayProps) {
    const element = useElement(props.elementID);
    const mapElementRef = useMapElementRef(props.elementID);

    const height = element?.properties.floatingHeight ?? DEFAULT_FLOATING_HEIGHT;

    if (!element || element.type !== "util-blankfloat")
        return null;
    return (
        <TickingGraphics
            draw={(g) => {
                const top = getOffsetFromElement(mapElementRef.current, {x: 0, y: height * UNITY_SCALE});

                g.moveTo(0, 0)
                    .lineTo(top.x, top.y)
                    .stroke({color: 0xffaa00, width: 4, alignment: 0.5});
            }}
        />
    );
}