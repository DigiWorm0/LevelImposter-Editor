import CanvasGridAxis from "./CanvasGridAxis";
import useViewportPosition from "../../../hooks/canvas/useViewportPosition";
import React from "react";
import CanvasGridSection from "./CanvasGridSection";
import {useSettingsValue} from "@/hooks/useSettings";
import CanvasGridBorder from "./CanvasGridBorder";
import {UNITY_SCALE} from "@/types/amongus/Constants";

const CELL_SIZE = 100;
const BORDER_SIZE = 500 * UNITY_SCALE;

export default function CanvasGrid() {
    const viewport = useViewportPosition();
    const {isGridVisible} = useSettingsValue();

    // If viewport is not defined, return nothing
    const left = viewport?.left || 0;
    const top = viewport?.top || 0;
    const right = viewport?.right || 0;
    const bottom = viewport?.bottom || 0;
    const scale = viewport?.scale || 1;

    // Calculate screen size based on viewport
    const width = right - left;
    const height = bottom - top;
    const size = Math.max(width, height) * scale;

    // Get the current step (1, 2, 3, etc.) based on the scale
    let sizeStep = Math.log10(1 / scale);

    // Calculate a percentage within the current step
    const sizeStepPercent = ((sizeStep % 1) + 1) % 1; // Normalize to [-1, 0] range

    // Round the size step to the nearest integer power of 10
    sizeStep = Math.pow(10, Math.floor(sizeStep));

    if (!isGridVisible)
        return null;
    return (
        <pixiContainer
            eventMode={"none"}
        >
            {/* Shrinking/Fading section */}
            <CanvasGridSection
                top={top}
                left={left}

                gridSize={size / scale}
                cellSize={CELL_SIZE}
                sizeStep={sizeStep}

                scale={scale}

                alpha={(1 - Math.sqrt(sizeStepPercent)) * 0.5}
            />

            {/* Active grid section */}
            <CanvasGridSection
                top={top}
                left={left}

                gridSize={size / scale}
                cellSize={CELL_SIZE * 10}
                sizeStep={sizeStep}

                scale={scale}

                alpha={0.5}
            />

            {/* Axis lines */}
            <CanvasGridAxis
                left={left}
                top={top}
                right={right}
                bottom={bottom}
                scale={scale}
            />

            {/* Border */}
            <CanvasGridBorder
                alpha={1}
                size={BORDER_SIZE}
                scale={scale}
            />
        </pixiContainer>
    );
}