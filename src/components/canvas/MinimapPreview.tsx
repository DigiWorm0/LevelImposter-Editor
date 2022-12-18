import { Image, Rect } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import { useSpriteType } from "../../hooks/useSprite";
import { MINIMAP_BUTTON_SIZE, MINIMAP_BUTTON_X, MINIMAP_BUTTON_Y, MINIMAP_HEIGHT, MINIMAP_WIDTH, UNITY_SCALE } from "../../types/generic/Constants";

export default function MinimapPreview() {
    const elem = useSelectedElemValue();
    const btnSprite = useSpriteType("util-minimapbtn");

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

            {btnSprite && (
                <Image
                    image={btnSprite}
                    x={(elem.x + MINIMAP_BUTTON_X * scale - MINIMAP_BUTTON_SIZE) * UNITY_SCALE}
                    y={-(elem.y + MINIMAP_BUTTON_Y * scale + MINIMAP_BUTTON_SIZE) * UNITY_SCALE}
                    width={MINIMAP_BUTTON_SIZE * scale * UNITY_SCALE * 2}
                    height={MINIMAP_BUTTON_SIZE * scale * UNITY_SCALE * 2}
                    opacity={0.5}
                    listening={false}
                />
            )}

        </>
    );
}