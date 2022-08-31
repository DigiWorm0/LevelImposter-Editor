import React from "react";
import { Image, Rect } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import useSprite from "../../hooks/useSprite";
import { DEFAULT_STARFIELD_COUNT, DEFAULT_STARFIELD_LENGTH, DEFAULT_STARFIELD_MAXSPEED, DEFAULT_STARFIELD_MINSPEED, DEFAULT_STARFIELD_HEIGHT, UNITY_SCALE } from "../../types/generic/Constants";

const REFRESH_RATE = 1000 / 60;

export default function StarfieldRender() {
    const selectedElem = useSelectedElemValue();
    const sprite = useSprite(selectedElem?.id);
    const [starPositions, setStarPositions] = React.useState<Array<{ x: number, y: number, speed: number }>>([]);

    const height = selectedElem?.properties.starfieldHeight !== undefined ? selectedElem.properties.starfieldHeight : DEFAULT_STARFIELD_HEIGHT;
    const minSpeed = selectedElem?.properties.starfieldMinSpeed !== undefined ? selectedElem.properties.starfieldMinSpeed : DEFAULT_STARFIELD_MINSPEED;
    const maxSpeed = selectedElem?.properties.starfieldMaxSpeed !== undefined ? selectedElem.properties.starfieldMaxSpeed : DEFAULT_STARFIELD_MAXSPEED;
    const count = selectedElem?.properties.starfieldCount !== undefined ? selectedElem.properties.starfieldCount : DEFAULT_STARFIELD_COUNT;
    const length = selectedElem?.properties.starfieldLength !== undefined ? selectedElem.properties.starfieldLength : DEFAULT_STARFIELD_LENGTH;

    React.useEffect(() => {
        const interval = setInterval(() => {
            const newStarPositions = starPositions.map(star => {
                star.x += (star.speed * REFRESH_RATE) / 1000;
                if (star.x > length) {
                    star.x = 0;
                    star.y = Math.random() * height - height / 2;
                }
                return star;
            });
            setStarPositions(newStarPositions);
        }, REFRESH_RATE);
        return () => clearInterval(interval);
    }, [starPositions, height, selectedElem]);

    React.useEffect(() => {
        if (!selectedElem || selectedElem.type !== "util-starfield")
            return;
        const newStarPositions = new Array(count).fill(0).map(() => ({
            x: Math.random() * length,
            y: Math.random() * height - height / 2,
            speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        }));
        setStarPositions(newStarPositions);
    }, [count, selectedElem]);

    if (!selectedElem || selectedElem.type !== "util-starfield" || !sprite)
        return null;
    return (
        <>
            {starPositions.map((star, i) => {
                const x = -star.x * UNITY_SCALE;
                const y = star.y * UNITY_SCALE;
                const w = sprite.width;
                const h = sprite.height;

                return (
                    <Image
                        key={i}
                        x={x - w / 2}
                        y={y - h / 2}
                        image={sprite}
                        width={w}
                        height={h}
                        listening={false}
                    />
                );
            })}

            <Rect
                x={-length * UNITY_SCALE}
                y={(-height / 2) * UNITY_SCALE}
                width={length * UNITY_SCALE}
                height={height * UNITY_SCALE}
                stroke="#ffaa00"
                strokeWidth={4}
                dashEnabled={true}
                dash={[10, 10]}
                listening={false}
            />
        </>
    );
}