import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/jotai/useSelectedElem";
import SwitchPanelInput from "../input/SwitchPanelInput";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";

export default function RoomPanel() {
    const { t } = useTranslation();
    const element = useSelectedElemValue();

    if (!element || element.type !== "util-room")
        return null;

    const hasCollider = element.properties.colliders !== undefined && element.properties.colliders.length > 0;

    return (
        <>
            <PanelContainer title={t("room.title") as string}>
                <SwitchPanelInput
                    name="room.showName"
                    prop="isRoomNameVisible"
                    defaultValue={true}
                />
                <SwitchPanelInput
                    name="room.showOnAdmin"
                    prop="isRoomAdminVisible"
                    defaultValue={true}
                />
            </PanelContainer>
            <MapError
                isVisible={!hasCollider}
                icon="polygon-filter"
            >
                {t("room.errorNoCollider") as string}
            </MapError>
        </>
    );
}
