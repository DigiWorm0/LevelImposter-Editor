import { Image, Line } from "react-konva";
import { useSelectedElemValue } from "../../hooks/map/elements/useSelectedElem";
import useSprite from "../../hooks/canvas/sprite/useSprite";
import { PLAYER_POS, UNITY_SCALE } from "../../types/generic/Constants";
import useSpriteOfType from "../../hooks/canvas/sprite/useSpriteOfType";

export default function PlayerZRender() {
    const selectedElem = useSelectedElemValue();
    const dummySprite = useSpriteOfType("util-dummy");
    const elemSprite = useSprite(selectedElem?.id);

    const inRange = Math.abs((selectedElem?.z || 0) - PLAYER_POS) <= 0.1;

    if (!selectedElem || !inRange || !dummySprite || !elemSprite)
        return null;

    // Get Line Size
    const lineWidth = elemSprite.width * selectedElem.xScale;
    const lineY = (selectedElem.z - PLAYER_POS) * -1000;

    // Calculate Points
    const centerPoint = { x: selectedElem.x * UNITY_SCALE, y: (lineY - selectedElem.y) * UNITY_SCALE };
    const leftPoint = { x: centerPoint.x - lineWidth / 2, y: centerPoint.y + 30 };
    const rightPoint = { x: centerPoint.x + lineWidth / 2, y: centerPoint.y + 30 };

    return (
        <>
            {dummySprite && (
                <Image
                    opacity={0.3}
                    x={centerPoint.x - dummySprite.width / 2}
                    y={centerPoint.y - dummySprite.height / 2}
                    image={dummySprite}
                    width={dummySprite.width}
                    height={dummySprite.height}
                    listening={false}
                />
            )}

            <Line
                points={[
                    leftPoint.x, leftPoint.y,
                    rightPoint.x, rightPoint.y,
                ]}
                stroke="#ffaa00ff"
                strokeWidth={4}
                dash={[10, 10]}
                listening={false}
            />
        </>
    );
}