import { Image } from "react-konva";
import useSpriteOfType from "../../hooks/canvas/sprite/useSpriteOfType";
import { useSelectedElemValue } from "../../hooks/elements/useSelectedElem";
import { useSettingsValue } from "../../hooks/useSettings";
import { DEFAULT_SPAWN_RANGE, SPAWN_PLAYER_COUNT, UNITY_SCALE } from "../../types/generic/Constants";

export default function SpawnRange() {
    const selectedElem = useSelectedElemValue();
    const sprite = useSpriteOfType("util-dummy");
    const { invisibleOpacity } = useSettingsValue();

    const radius = selectedElem?.properties.range ?? DEFAULT_SPAWN_RANGE;
    const arr = new Array(SPAWN_PLAYER_COUNT).fill(0);

    if (!selectedElem || !selectedElem.type.startsWith("util-spawn"))
        return null;
    return (
        <>
            {arr.map((_, i) => {
                if (!sprite)
                    return null;

                const x = (Math.cos(2 * Math.PI * (i / SPAWN_PLAYER_COUNT) + (Math.PI / 2)) * radius + selectedElem.x) * UNITY_SCALE;
                const y = (Math.sin(2 * Math.PI * (i / SPAWN_PLAYER_COUNT) + (Math.PI / 2)) * radius - selectedElem.y) * UNITY_SCALE;
                const w = sprite.width;
                const h = sprite.height;

                return (
                    <Image
                        key={i}
                        opacity={invisibleOpacity}
                        x={x - w / 2}
                        y={y - h / 2}
                        image={sprite}
                        width={w}
                        height={h}
                        listening={false}
                    />
                );
            })}
        </>
    );
}