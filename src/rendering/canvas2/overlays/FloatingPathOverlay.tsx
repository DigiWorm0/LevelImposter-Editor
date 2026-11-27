import React from "react";
import GUID from "@shared/types/GUID";
import {DEFAULT_FLOATING_HEIGHT} from "@/db/elementDefaults";
import {UNITY_SCALE} from "@editor/viewport/coordinates";
import useMapElementRef from "../element/useMapElementRef";
import TickingGraphics from "../common/TickingGraphics";
import getOffsetFromElement from "../utils/getOffsetFromElement";
import {useElement} from "@editor/document/elements/useElement";

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