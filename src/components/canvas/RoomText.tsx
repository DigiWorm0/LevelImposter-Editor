import { Text } from "react-konva";
import { useSelectedElemValue } from "../../hooks/map/elements/useSelectedElem";
import { useSettingsValue } from "../../hooks/useSettings";
import { ROOM_TEXT_HEIGHT, ROOM_TEXT_WIDTH, UNITY_SCALE } from "../../types/generic/Constants";

export default function RoomText() {
    const selectedElem = useSelectedElemValue();
    const { isRoomNameVisible } = useSettingsValue();

    if (!selectedElem)
        return null;
    if (selectedElem.type !== "util-room")
        return null;
    if (!isRoomNameVisible)
        return null;
    if (!(selectedElem.properties.isRoomNameVisible ?? true))
        return null;

    const name = selectedElem.name.replaceAll("\\n", "\n");

    return (
        <Text
            text={name}
            x={(selectedElem.x - ROOM_TEXT_WIDTH / 2) * UNITY_SCALE}
            y={-(selectedElem.y + ROOM_TEXT_HEIGHT / 2) * UNITY_SCALE}
            fontSize={UNITY_SCALE}
            opacity={0.6}
            fontFamily="Arial"
            fontStyle={"bold"}
            fill="white"
            stroke="black"
            strokeWidth={3}
            letterSpacing={-4}

            align="center"
            verticalAlign="middle"
            width={ROOM_TEXT_WIDTH * UNITY_SCALE}
            height={ROOM_TEXT_HEIGHT * UNITY_SCALE}
            listening={false}
        />
    );
}