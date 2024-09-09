import {Text} from "react-konva";
import {useSettingsValue} from "../../hooks/useSettings";
import {ROOM_TEXT_HEIGHT, ROOM_TEXT_WIDTH, UNITY_SCALE} from "../../types/generic/Constants";

export interface RoomTextProps {
    name: string;
}

export default function RoomText(props: RoomTextProps) {
    const {isRoomNameVisible} = useSettingsValue();

    if (!isRoomNameVisible)
        return null;

    const name = props.name.replaceAll("\\n", "\n");

    return (
        <Text
            text={name}
            x={(-ROOM_TEXT_WIDTH / 2) * UNITY_SCALE}
            y={(-ROOM_TEXT_HEIGHT / 2) * UNITY_SCALE}
            fontSize={UNITY_SCALE}
            opacity={0.7}
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