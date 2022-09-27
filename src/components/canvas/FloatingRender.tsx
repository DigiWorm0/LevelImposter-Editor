import React from "react";
import { Image, Line } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import useSprite from "../../hooks/useSprite";
import { DEFAULT_FLOATING_HEIGHT, DEFAULT_FLOATING_SPEED, UNITY_SCALE } from "../../types/generic/Constants";

const REFRESH_RATE = 1000 / 60; // ms

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
            <Image
                x={-sprite.width / 2}
                y={-sprite.height / 2 - (y * UNITY_SCALE)}
                image={sprite}
                width={sprite.width}
                height={sprite.height}
                listening={false}
            />

            <Line
                points={[0, 0, 0, -height * UNITY_SCALE]}
                stroke="#ffaa00"
                strokeWidth={4}
                dashEnabled={true}
                dash={[10, 10]}
                listening={false}
            />
        </>
    );
}