import useIsSelectedElemType from "../../hooks/elements/useSelectedElemIsType";
import { useSelectedElemPropValue } from "../../hooks/elements/useSelectedElemProperty";
import { DEFAULT_DISPLAY_HEIGHT, DEFAULT_DISPLAY_WIDTH, UNITY_SCALE } from "../../types/generic/Constants";
import { useSelectedElemValue } from "../../hooks/elements/useSelectedElem";
import { Group, Rect } from "react-konva";

export default function DisplayRender() {
    const isDisplay = useIsSelectedElemType("util-display");
    const selectedElem = useSelectedElemValue();
    const displayHeight = useSelectedElemPropValue("displayHeight");
    const displayWidth = useSelectedElemPropValue("displayWidth");

    if (!isDisplay || !selectedElem)
        return null;

    const camHeight = displayHeight ?? DEFAULT_DISPLAY_HEIGHT;
    const camWidth = displayWidth ?? DEFAULT_DISPLAY_WIDTH;

    return (
        <Group
            x={selectedElem.x * UNITY_SCALE}
            y={-selectedElem.y * UNITY_SCALE}
            scaleX={selectedElem.xScale}
            scaleY={selectedElem.yScale}
            rotation={-selectedElem.rotation}
            listening={false}
        >
            <Rect
                x={-camWidth / 2}
                y={-camHeight / 2}
                width={camWidth}
                height={camHeight}
                fill="#0000ff22"
                stroke="blue"
                strokeWidth={2}
                listening={false}
            />
        </Group>
    );
}