import { atom, useAtomValue } from "jotai";
import { Image } from "react-konva";
import { elementsAtom } from "../../hooks/jotai/useMap";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import useSprite from "../../hooks/useSprite";
import { MINIMAP_BUTTON_SIZE, UNITY_SCALE } from "../../types/generic/Constants";

const minimapScaleAtom = atom((get) => {
    const elems = get(elementsAtom);
    const minimap = elems.find((e) => e.type === "util-minimap");
    const scale = minimap?.properties.minimapScale === undefined ? 1 : minimap.properties.minimapScale;
    return scale;
});

export default function SabotageButton() {
    const elem = useSelectedElemValue();
    const btnSprite = useSprite(elem?.id);
    const scale = useAtomValue(minimapScaleAtom);

    if (!elem || !elem.type.startsWith("sab-btn") || !btnSprite)
        return null;

    return (
        <>
            <Image
                image={btnSprite}
                x={(elem.x - (MINIMAP_BUTTON_SIZE * scale * elem.xScale)) * UNITY_SCALE}
                y={-(elem.y + (MINIMAP_BUTTON_SIZE * scale * elem.yScale)) * UNITY_SCALE}
                width={MINIMAP_BUTTON_SIZE * scale * UNITY_SCALE * 2 * elem.xScale}
                height={MINIMAP_BUTTON_SIZE * scale * UNITY_SCALE * 2 * elem.yScale}
                opacity={0.3}
                listening={false}
            />
        </>
    );
}