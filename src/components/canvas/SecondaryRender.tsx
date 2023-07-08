import React from "react";
import { Image } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import useSprite from "../../hooks/useSprite";
import {
    DEFAULT_FLOATING_HEIGHT,
    DEFAULT_FLOATING_SPEED,
    DEFAULT_STARFIELD_COUNT,
    DEFAULT_STARFIELD_HEIGHT,
    DEFAULT_STARFIELD_LENGTH,
    DEFAULT_STARFIELD_MAXSPEED,
    DEFAULT_STARFIELD_MINSPEED,
    UNITY_SCALE
} from "../../types/generic/Constants";

interface Point {
    x: number;
    y: number;

    speed?: number;
}

const REFRESH_RATE = 1000 / 60;

export default function SecondaryRender() {
    const selectedElem = useSelectedElemValue();
    const sprite = useSprite(selectedElem?.id);
    const [positions, setPositions] = React.useState<Point[]>([]);
    const [intervalID, setIntervalID] = React.useState<NodeJS.Timeout | null>(null);

    // Starfield
    const runStarfield = React.useCallback(() => {
        // Clear Interval
        if (intervalID)
            clearInterval(intervalID);

        // Get Properties
        const height = selectedElem?.properties.starfieldHeight ?? DEFAULT_STARFIELD_HEIGHT;
        const length = selectedElem?.properties.starfieldLength ?? DEFAULT_STARFIELD_LENGTH;
        const minSpeed = selectedElem?.properties.starfieldMinSpeed ?? DEFAULT_STARFIELD_MINSPEED;
        const maxSpeed = selectedElem?.properties.starfieldMaxSpeed ?? DEFAULT_STARFIELD_MAXSPEED;
        const count = selectedElem?.properties.starfieldCount ?? DEFAULT_STARFIELD_COUNT;

        // Initialize Positions
        const newPositions = [];
        for (let i = 0; i < count; i++) {
            const x = Math.random() * length;
            const y = Math.random() * height - height / 2;
            const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
            newPositions.push({x, y, speed});
        }
        setPositions(newPositions);

        // Run Tick
        const interval = setInterval(() => {
            setPositions((positions) => {
                return positions.map((pos) => {
                    const x = pos.x + ((pos.speed ?? 0) * REFRESH_RATE) / 1000;
                    if (x > length)
                        return {
                            x: 0,
                            y: Math.random() * height - height / 2,
                            speed: Math.random() * (maxSpeed - minSpeed) + minSpeed
                        };
                    return {
                        x: x,
                        y: pos.y,
                        speed: pos.speed
                    };
                });
            });
        }, REFRESH_RATE);
        setIntervalID(interval);
    }, [selectedElem, setPositions]);

    // Floating
    const runFloating = React.useCallback(() => {
        // Clear Interval
        if (intervalID)
            clearInterval(intervalID);

        // Get Properties
        const height = selectedElem?.properties.floatingHeight ?? DEFAULT_FLOATING_HEIGHT;
        const speed = selectedElem?.properties.floatingSpeed ?? DEFAULT_FLOATING_SPEED;

        // Initialize Positions
        setPositions([{x: 0, y: 0}]);

        // Run Tick
        const interval = setInterval(() => {
            const t = new Date().getTime() / 1000;
            const y = -(Math.sin(t * speed) + 1) * height / 2;
            setPositions([{x: 0, y: y}]);
        }, REFRESH_RATE);
        setIntervalID(interval);
    }, [selectedElem, setPositions]);

    // Init
    React.useEffect(() => {
        if (!selectedElem || !sprite)
            return;
        switch (selectedElem.type) {
            case "util-starfield":
                runStarfield();
                break;
            case "util-blankfloat":
                runFloating();
                break;
            default:
                setPositions([]);
        }
    }, [selectedElem, sprite, setPositions, runStarfield]);

    if (!selectedElem || !sprite)
        return null;
    return (
        <>
            {positions.map((pos, i) => (
                <Image
                    key={i}
                    x={-sprite.width / 2 - pos.x * UNITY_SCALE}
                    y={-sprite.height / 2 + pos.y * UNITY_SCALE}
                    image={sprite}
                    width={sprite.width}
                    height={sprite.height}
                    opacity={0.5}
                    listening={false}
                />
            ))}
        </>
    );
}