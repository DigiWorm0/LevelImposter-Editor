import React from "react";
import { useTranslation } from "react-i18next";
import { useElementsOfType } from "../../../hooks/elements/useElementsOfType";
import RoomSelect from "../input/select/RoomSelect";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import ElementPropSwitch from "../input/elementProps/ElementPropSwitch";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import { useSelectedElemPropValue } from "../../../hooks/elements/useSelectedElemProperty";
import { MaybeGUID } from "../../../types/generic/GUID";

export default function OneWayColliderPanel() {
    const { t } = useTranslation();
    const isOneWayCollider = useIsSelectedElemType("util-onewaycollider");
    const parentID = useSelectedElemPropValue<MaybeGUID>("parent")
    const roomElems = useElementsOfType("util-room");
    const parentRoom = React.useMemo(() => roomElems.find((e) => e.id === parentID), [roomElems, parentID]);

    if (!isOneWayCollider)
        return null;

    return (
        <>
            <PanelContainer title={t("onewaycollider.title") as string}>
                <RoomSelect useDefault={false} />
                <ElementPropSwitch
                    name={t("onewaycollider.ignoreImposter")}
                    tooltip={t("onewaycollider.infoIgnoreImposter")}
                    prop={"isImposterIgnored"}
                    defaultValue={false}
                />
            </PanelContainer>
            <MapError
                isVisible={parentRoom === undefined}
                icon="Room"
            >
                {t("onewaycollider.errorNoRoom")}
            </MapError>
        </>
    );
}
