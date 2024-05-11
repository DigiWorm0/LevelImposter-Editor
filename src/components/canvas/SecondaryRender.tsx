import React from "react";
import { Rect } from "react-konva";
import { useSelectedElemValue } from "../../hooks/map/elements/useSelectedElem";
import useSprite from "../../hooks/canvas/useSprite";
import {
    DEFAULT_FLOATING_HEIGHT,
    DEFAULT_FLOATING_SPEED,
    DEFAULT_SCROLL_X_SPEED,
    DEFAULT_SCROLL_Y_SPEED,
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

    offsetX?: number;
    offsetY?: number;
    speed?: number;
}

const REFRESH_RATE = 1000 / 60;

export default function SecondaryRender() {
    const selectedElem = useSelectedElemValue();
    const sprite = useSprite(selectedElem?.id);
    const [positions, setPositions] = React.useState<Point[]>([]);

    // Starfield
    const runStarfield = React.useCallback(() => {
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
            newPositions.push({ x, y, speed });
        }
        setPositions(newPositions);
    }, [selectedElem, setPositions]);
    const runStarfieldTick = React.useCallback(() => {
        // Get Properties
        const height = selectedElem?.properties.starfieldHeight ?? DEFAULT_STARFIELD_HEIGHT;
        const length = selectedElem?.properties.starfieldLength ?? DEFAULT_STARFIELD_LENGTH;
        const minSpeed = selectedElem?.properties.starfieldMinSpeed ?? DEFAULT_STARFIELD_MINSPEED;
        const maxSpeed = selectedElem?.properties.starfieldMaxSpeed ?? DEFAULT_STARFIELD_MAXSPEED;

        // Update Positions
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
    }, [selectedElem, setPositions]);

    // Floating
    const runFloating = React.useCallback(() => {
        // Initialize Positions
        setPositions([{ x: 0, y: 0 }]);
    }, [setPositions]);
    const runFloatingTick = React.useCallback(() => {
        // Get Properties
        const height = selectedElem?.properties.floatingHeight ?? DEFAULT_FLOATING_HEIGHT;
        const speed = selectedElem?.properties.floatingSpeed ?? DEFAULT_FLOATING_SPEED;

        // Run Tick
        const t = new Date().getTime() / 1000;
        const y = -(Math.sin(t * speed) + 1) * height / 2;
        setPositions([{ x: 0, y: y }]);
    }, [selectedElem, setPositions]);

    // Scrolling
    const runScrolling = React.useCallback(() => {
        // Initialize Positions
        setPositions([{ x: 0, y: 0 }]);
    }, [selectedElem, setPositions]);
    const runScrollingTick = React.useCallback(() => {
        // Get Properties
        const xSpeed = selectedElem?.properties.scrollingXSpeed ?? DEFAULT_SCROLL_X_SPEED;
        const ySpeed = selectedElem?.properties.scrollingYSpeed ?? DEFAULT_SCROLL_Y_SPEED;

        // Update Positions
        setPositions((positions) => {
            return positions.map((pos) => {
                return {
                    x: pos.x,
                    y: pos.y,
                    offsetX: (pos.offsetX ?? 0) + xSpeed * REFRESH_RATE / 1000,
                    offsetY: (pos.offsetY ?? 0) + ySpeed * REFRESH_RATE / 1000
                };
            });
        });
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
            case "util-blankscroll":
                runScrolling();
                break;
            default:
                setPositions([]);
        }
    }, [selectedElem, sprite, setPositions, runStarfield, runScrolling, runFloating]);

    // Do Tick
    React.useEffect(() => {
        if (!selectedElem)
            return;

        const interval = setInterval(() => {
            switch (selectedElem.type) {
                case "util-starfield":
                    runStarfieldTick();
                    break;
                case "util-blankfloat":
                    runFloatingTick();
                    break;
                case "util-blankscroll":
                    runScrollingTick();
                    break;
            }
        }, REFRESH_RATE);

        return () => clearInterval(interval);
    }, [selectedElem, runScrollingTick, runFloatingTick, runStarfieldTick]);

    if (!selectedElem || !sprite)
        return null;
    return (
        <>
            {positions.map((pos, i) => (
                <Rect
                    key={i}
                    x={-sprite.width / 2 - pos.x * UNITY_SCALE}
                    y={-sprite.height / 2 + pos.y * UNITY_SCALE}
                    fillPatternImage={sprite}
                    fillPatternOffsetX={(pos.offsetX ?? 0) * UNITY_SCALE}
                    fillPatternOffsetY={(pos.offsetY ?? 0) * UNITY_SCALE}
                    width={sprite.width}
                    height={sprite.height}
                    listening={false}
                />
            ))}
        </>
    );
}