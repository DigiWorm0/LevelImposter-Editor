import { useTranslation } from "react-i18next";
import { selectedElementAtom } from "../../../hooks/elements/useSelectedElem";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import React from "react";
import { atom, useAtomValue } from "jotai";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import ElementPropSwitch from "../input/elementProps/ElementPropSwitch";
import { HighlightAlt } from "@mui/icons-material";

const hasColliderAtom = atom((get) => {
    const element = get(selectedElementAtom);
    return element?.properties.colliders !== undefined && element.properties.colliders.length > 0;
});

export default function RoomPanel() {
    const { t } = useTranslation();
    const isRoom = useIsSelectedElemType("util-room");
    const hasCollider = useAtomValue(hasColliderAtom);

    if (!isRoom)
        return null;

    return (
        <>
            <PanelContainer title={t("room.title") as string}>
                <ElementPropSwitch
                    name={t("room.showName")}
                    prop="isRoomNameVisible"
                    defaultValue={true}
                />
                <ElementPropSwitch
                    name={t("room.showOnAdmin")}
                    prop="isRoomAdminVisible"
                    defaultValue={true}
                />
                <ElementPropSwitch
                    name={t("room.showOnUI")}
                    prop="isRoomUIVisible"
                    defaultValue={true}
                />
            </PanelContainer>
            <MapError
                isVisible={!hasCollider}
                icon={<HighlightAlt />}
            >
                {t("room.errorNoCollider") as string}
            </MapError>
        </>
    );
}
