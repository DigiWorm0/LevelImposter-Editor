import GUID from "../../../types/common/GUID";
import {useSettingsValue} from "@/hooks/useSettings";
import {UNITY_SCALE} from "@/types/amongus/Constants";
import {useElement} from "@/hooks/elements/useElement";

interface RoomOverlayProps {
    elementID: GUID;
}

export default function RoomOverlay(props: RoomOverlayProps) {
    const elem = useElement(props.elementID);
    const {isRoomNameVisible} = useSettingsValue();

    const isRoom = elem?.type === "util-room";
    const isElemNameVisible = elem?.properties.isRoomNameVisible ?? true;

    if (!elem ||
        !isRoom ||
        !isRoomNameVisible ||
        !isElemNameVisible)
        return null;

    return (
        <pixiBitmapText
            eventMode={"none"}
            text={elem?.name ?? ""}
            x={0}
            y={0}

            // height={ROOM_TEXT_HEIGHT * UNITY_SCALE}
            anchor={0.5}

            alpha={0.5}
            style={{
                fontFamily: "Arial",
                fontWeight: "bold",
                align: "center",
                fill: "white",
                stroke: {color: "black", width: 10},
                fontSize: UNITY_SCALE,
            }}
        />
    );
}