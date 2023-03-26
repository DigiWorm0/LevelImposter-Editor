import React from "react";
import { Image, Line } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import useAdjustPoint from "../../hooks/useAdjustPoint";
import useSprite from "../../hooks/useSprite";
import { DEFAULT_STARFIELD_COUNT, DEFAULT_STARFIELD_HEIGHT, DEFAULT_STARFIELD_LENGTH, DEFAULT_STARFIELD_MAXSPEED, DEFAULT_STARFIELD_MINSPEED } from "../../types/generic/Constants";

const REFRESH_RATE = 1000 / 60;

export default function StarfieldRender() {
    const selectedElem = useSelectedElemValue();
    const sprite = useSprite(selectedElem?.id);
    const [starPositions, setStarPositions] = React.useState<Array<{ x: number, y: number, speed: number }>>([]);
    const { relativeToAbsolute } = useAdjustPoint();

    const height = React.useMemo(() => {
        return selectedElem?.properties.starfieldHeight ?? DEFAULT_STARFIELD_HEIGHT;
    }, [selectedElem]);

    const minSpeed = React.useMemo(() => {
        return selectedElem?.properties.starfieldMinSpeed ?? DEFAULT_STARFIELD_MINSPEED;
    }, [selectedElem]);

    const maxSpeed = React.useMemo(() => {
        return selectedElem?.properties.starfieldMaxSpeed ?? DEFAULT_STARFIELD_MAXSPEED;
    }, [selectedElem]);

    const count = React.useMemo(() => {
        return selectedElem?.properties.starfieldCount ?? DEFAULT_STARFIELD_COUNT;
    }, [selectedElem]);

    const length = React.useMemo(() => {
        return selectedElem?.properties.starfieldLength ?? DEFAULT_STARFIELD_LENGTH;
    }, [selectedElem]);

    const rectPoints = React.useMemo(() => {
        const topLeftPoint = relativeToAbsolute({ x: -length, y: -height / 2 });
        const topRightPoint = relativeToAbsolute({ x: 0, y: -height / 2 });
        const bottomLeftPoint = relativeToAbsolute({ x: -length, y: height / 2 });
        const bottomRightPoint = relativeToAbsolute({ x: 0, y: height / 2 });

        return [
            topLeftPoint.x, topLeftPoint.y,
            topRightPoint.x, topRightPoint.y,
            bottomRightPoint.x, bottomRightPoint.y,
            bottomLeftPoint.x, bottomLeftPoint.y,
        ];
    }, [relativeToAbsolute]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (selectedElem?.type !== "util-starfield")
                return;
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
                const p = relativeToAbsolute({ x: -star.x, y: star.y })
                const w = sprite.width;
                const h = sprite.height;

                return (
                    <Image
                        key={i}
                        x={p.x - w / 2}
                        y={p.y - h / 2}
                        width={selectedElem.xScale * w}
                        height={selectedElem.yScale * h}
                        rotation={-selectedElem.rotation}
                        image={sprite}
                        listening={false}
                    />
                );
            })}

            <Line
                points={rectPoints}
                closed
                stroke="#ffaa00"
                strokeWidth={4}
                dashEnabled={true}
                dash={[10, 10]}
                listening={false}
            />
        </>
    );
}