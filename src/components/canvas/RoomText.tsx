import { Text } from "react-konva";
import { useSettingsValue } from "../../hooks/useSettings";
import { ROOM_TEXT_HEIGHT, ROOM_TEXT_WIDTH, UNITY_SCALE } from "../../types/generic/Constants";
import { useCameraScaleValue } from "../../hooks/canvas/useCameraScale";
import clamp from "../../utils/clamp";

export interface RoomTextProps {
    name: string;
}

export default function RoomText(props: RoomTextProps) {
    const scale = useCameraScaleValue();
    const { isRoomNameVisible } = useSettingsValue();

    if (!isRoomNameVisible)
        return null;

    const name = props.name.replaceAll("\\n", "\n");
    const alpha = clamp((1 / scale) - 1.5, 0, 0.8);

    return (
        <Text
            text={name}
            x={(-ROOM_TEXT_WIDTH / 2) * UNITY_SCALE}
            y={(-ROOM_TEXT_HEIGHT / 2) * UNITY_SCALE}
            fontSize={UNITY_SCALE}
            opacity={alpha}
            fontFamily={"Arial"}
            fontStyle={"bold"}
            fill={"white"}
            stroke={"black"}
            strokeWidth={3}
            letterSpacing={-4}

            align={"center"}
            verticalAlign={"middle"}
            width={ROOM_TEXT_WIDTH * UNITY_SCALE}
            height={ROOM_TEXT_HEIGHT * UNITY_SCALE}
            listening={false}
            perfectDrawEnabled={false}
        />
    );
}