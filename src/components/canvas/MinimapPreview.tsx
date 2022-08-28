import { Circle, Rect } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import { MINIMAP_BUTTON_SIZE, MINIMAP_BUTTON_X, MINIMAP_BUTTON_Y, MINIMAP_HEIGHT, MINIMAP_WIDTH, UNITY_SCALE } from "../../types/generic/Constants";

export default function MinimapPreview() {
    const elem = useSelectedElemValue();

    const scale = elem?.properties.minimapScale === undefined ? 1 : elem.properties.minimapScale;

    if (!elem
        || elem.type !== "util-minimap")
        return null;

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
            <Circle
                x={(elem.x + MINIMAP_BUTTON_X * scale) * UNITY_SCALE}
                y={-(elem.y + MINIMAP_BUTTON_Y * scale) * UNITY_SCALE}
                radius={MINIMAP_BUTTON_SIZE * scale * UNITY_SCALE}
                fill="#ffaa0066"
                stroke="#ffaa00ff"
                strokeWidth={6}
                dashEnabled={true}
                dash={[10, 10]}
                listening={false}
            />

        </>
    );
}