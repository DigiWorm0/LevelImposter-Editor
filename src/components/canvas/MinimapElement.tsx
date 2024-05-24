import { atom, useAtomValue } from "jotai";
import { Image } from "react-konva";
import { elementsAtom } from "../../hooks/map/useMap";
import { useSelectedElemValue } from "../../hooks/map/elements/useSelectedElem";
import useSprite from "../../hooks/canvas/sprite/useSprite";
import { MINIMAP_BUTTON_SIZE, UNITY_SCALE } from "../../types/generic/Constants";

const minimapScaleAtom = atom((get) => {
    const elems = get(elementsAtom);
    const minimap = elems.find((e) => e.type === "util-minimap");
    return minimap?.properties.minimapScale ?? 1;
});

export default function MinimapElement() {
    const elem = useSelectedElemValue();
    const sprite = useSprite(elem?.id);
    const scale = useAtomValue(minimapScaleAtom);

    if (!elem || (!elem.type.startsWith("sab-btn") && elem.type != "util-minimapsprite") || !sprite)
        return null;

    const w = sprite ? sprite.width * scale * MINIMAP_BUTTON_SIZE * elem.xScale : 0;
    const h = sprite ? sprite.height * scale * MINIMAP_BUTTON_SIZE * elem.yScale : 0;

    return (
        <>
            <Image
                image={sprite}
                x={elem.x * UNITY_SCALE - (w / 2)}
                y={-elem.y * UNITY_SCALE - (h / 2)}
                width={w}
                height={h}
                opacity={0.3}
                listening={false}
            />
        </>
    );
}