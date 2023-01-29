import { Image, Line } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import useSprite, { useSpriteType } from "../../hooks/useSprite";
import { PLAYER_POS, UNITY_SCALE } from "../../types/generic/Constants";

export default function PlayerZRender() {
    const selectedElem = useSelectedElemValue();
    const sprite = useSpriteType("util-dummy");
    const elemSprite = useSprite(selectedElem?.id);

    const inRange = Math.abs((selectedElem?.z || 0) - PLAYER_POS) <= 0.1;

    if (!selectedElem || !inRange || !sprite || !elemSprite)
        return null;

    const w = sprite?.width || 0;
    const h = sprite?.height || 0;
    const elemW = elemSprite?.width || 0;
    const elemH = elemSprite?.height || 0;
    const y = (selectedElem.z - PLAYER_POS) * 1000;

    return (
        <>
            <Image
                opacity={0.3}
                x={-w / 2}
                y={y * UNITY_SCALE - h / 2}
                image={sprite}
                width={w}
                height={h}
                listening={false}
            />

            <Line
                points={[-elemW / 2, y * UNITY_SCALE, elemW / 2, y * UNITY_SCALE]}
                stroke="#ffaa00ff"
                strokeWidth={4}
                dash={[10, 10]}
                listening={false}
            />
        </>
    );
}