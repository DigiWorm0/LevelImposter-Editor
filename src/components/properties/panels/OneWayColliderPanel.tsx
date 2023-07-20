import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/jotai/useSelectedElem";
import PanelContainer from "../util/PanelContainer";
import RoomSelect from "../input/RoomSelect";
import React from "react";
import MapError from "../util/MapError";
import { useElementType } from "../../../hooks/jotai/useTypes";
import SwitchPanelInput from "../input/SwitchPanelInput";

export default function OneWayColliderPanel() {
    const { t } = useTranslation();
    const selectedElem = useSelectedElemValue();
    const roomElems = useElementType("util-room");
    const parentRoom = React.useMemo(() => roomElems.find((e) => e.id === selectedElem?.properties.parent), [selectedElem, roomElems]);

    if (!selectedElem || selectedElem.type !== "util-onewaycollider")
        return null;

    return (
        <>
            <PanelContainer title={t("onewaycollider.title") as string}>
                <RoomSelect useDefault={false} />
                <SwitchPanelInput
                    name={"onewaycollider.ignoreImposter"}
                    tooltip={"onewaycollider.infoIgnoreImposter"}
                    prop={"isImposterIgnored"}
                    defaultValue={false}
                />
            </PanelContainer>
            <MapError
                isVisible={parentRoom === undefined}
                icon="map-marker"
            >
                {t("onewaycollider.errorNoRoom")}
            </MapError>
        </>
    );
}
