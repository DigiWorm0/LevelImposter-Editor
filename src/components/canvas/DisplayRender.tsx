import { Group, Rect } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import { DEFAULT_DISPLAY_HEIGHT, DEFAULT_DISPLAY_WIDTH, UNITY_SCALE } from "../../types/generic/Constants";

export default function DisplayRender() {
    const selectedElem = useSelectedElemValue();

    if (!selectedElem
        || selectedElem.type !== "util-display")
        return null;

    const { x, y, xScale, yScale, rotation } = selectedElem;

    const camHeight = selectedElem.properties.displayHeight ?? DEFAULT_DISPLAY_HEIGHT;
    const camWidth = selectedElem.properties.displayWidth ?? DEFAULT_DISPLAY_WIDTH;

    return (
        <Group
            x={x * UNITY_SCALE}
            y={-y * UNITY_SCALE}
            scaleX={xScale}
            scaleY={yScale}
            rotation={-rotation}
            listening={false}
        >
            <Rect
                x={-camWidth / 2}
                y={-camHeight / 2}
                width={camWidth}
                height={camHeight}
                fill="#0000ff22"
                stroke="blue"
                strokeWidth={10}
                listening={false}
            />
        </Group>
    );
}