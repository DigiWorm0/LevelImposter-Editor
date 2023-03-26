import React from "react";
import { Group, Image, Line, Rect } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import useSprite from "../../hooks/useSprite";
import { DEFAULT_FLOATING_HEIGHT, DEFAULT_FLOATING_SPEED, UNITY_SCALE } from "../../types/generic/Constants";

const REFRESH_RATE = 1000 / 30; // ms

export default function FloatingRender() {
    const selectedElem = useSelectedElemValue();
    const sprite = useSprite(selectedElem?.id);
    const [t, setT] = React.useState(0);

    const height = selectedElem?.properties.floatingHeight === undefined ? DEFAULT_FLOATING_HEIGHT : selectedElem.properties.floatingHeight;
    const speed = selectedElem?.properties.floatingSpeed === undefined ? DEFAULT_FLOATING_SPEED : selectedElem.properties.floatingSpeed;

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (selectedElem?.type !== "util-blankfloat")
                return;
            setT(new Date().getTime() / 1000);
        }, REFRESH_RATE);
        return () => clearInterval(interval);
    }, [selectedElem]);

    const y = (Math.sin(t * speed) + 1) * height / 2;

    if (!selectedElem || selectedElem.type !== "util-blankfloat" || !sprite)
        return null;
    return (
        <>
            <Group
                x={selectedElem.x * UNITY_SCALE}
                y={-selectedElem.y * UNITY_SCALE}
                scaleX={selectedElem.xScale}
                scaleY={selectedElem.yScale}
                rotation={-selectedElem.rotation}
                listening={false}
            >
                <Image
                    x={-sprite.width / 2}
                    y={-sprite.height / 2 - (y * UNITY_SCALE)}
                    image={sprite}
                    width={sprite.width}
                    height={sprite.height}
                    listening={false}
                />
                <Rect
                    x={-sprite.width / 2}
                    y={-sprite.height / 2 - (y * UNITY_SCALE)}
                    width={sprite.width}
                    height={sprite.height}
                    stroke="#ffaa00"
                    opacity={0.5}
                    listening={false}
                />
            </Group>

            <Line
                points={[
                    selectedElem.x * UNITY_SCALE, -selectedElem.y * UNITY_SCALE,
                    selectedElem.x * UNITY_SCALE, -selectedElem.y * UNITY_SCALE - (height * UNITY_SCALE),
                ]}
                stroke="#ffaa00"
                strokeWidth={4}
                lineCap="round"
                listening={false}
            />
        </>
    );
}