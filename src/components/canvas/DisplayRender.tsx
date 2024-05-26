import useIsSelectedElemType from "../../hooks/elements/useSelectedElemIsType";
import { useSelectedElemPropValue } from "../../hooks/elements/useSelectedElemProperty";
import { DEFAULT_DISPLAY_HEIGHT, DEFAULT_DISPLAY_WIDTH } from "../../types/generic/Constants";

export default function DisplayRender() {
    const isDisplay = useIsSelectedElemType("util-display");
    const displayHeight = useSelectedElemPropValue("displayHeight");
    const displayWidth = useSelectedElemPropValue("displayWidth");

    if (!isDisplay)
        return null;

    const camHeight = displayHeight ?? DEFAULT_DISPLAY_HEIGHT;
    const camWidth = displayWidth ?? DEFAULT_DISPLAY_WIDTH;

    /*
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
                strokeWidth={2}
                listening={false}
            />
        </Group>
    );
    */
    // TODO: Fix Me
    return null;
}