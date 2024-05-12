import { Rect } from "react-konva";
import { useSelectedElemValue } from "../../hooks/map/elements/useSelectedElem";
import { MINIMAP_HEIGHT, MINIMAP_WIDTH, UNITY_SCALE } from "../../types/generic/Constants";

export default function MinimapPreview() {
    const elem = useSelectedElemValue();

    if (!elem
        || elem.type !== "util-minimap")
        return null;

    const scale = elem?.properties.minimapScale ?? 1;

    return (
        <>
            <Rect
                x={(elem.x - MINIMAP_WIDTH * scale * 0.5) * UNITY_SCALE}
                y={-(elem.y + MINIMAP_HEIGHT * scale * 0.5) * UNITY_SCALE}
                width={MINIMAP_WIDTH * scale * UNITY_SCALE}
                height={MINIMAP_HEIGHT * scale * UNITY_SCALE}
                fill="#ffaa0022"
                stroke="#ffaa00ff"
                strokeWidth={6}
                dashEnabled={true}
                dash={[10, 10]}
                listening={false}
            />
        </>
    );
}