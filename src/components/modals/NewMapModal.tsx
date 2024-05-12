import { Button, Dialog } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSettingsValue } from "../../hooks/useSettings";
import { useResetMap } from "../../hooks/map/useMap";
import { useSetSelectedElemID } from "../../hooks/map/elements/useSelectedElem";
import { useSetSelectedColliderID } from "../../hooks/map/elements/useSelectedCollider";

export interface NewMapDialogProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function NewMapModal(props: NewMapDialogProps) {
    const { t } = useTranslation();
    const { isDarkMode } = useSettingsValue();
    const resetMap = useResetMap();
    const setSelectedID = useSetSelectedElemID();
    const setColliderID = useSetSelectedColliderID();

    const onClick = React.useCallback(() => {
        resetMap();
        setSelectedID(undefined);
        setColliderID(undefined);
        props.onClose();
    }, [resetMap, setSelectedID, setColliderID, props.onClose]);

    return (
        <Dialog
            isOpen={props.isVisible}
            onClose={props.onClose}
            title={t("map.new") as string}
            portalClassName={isDarkMode ? "bp5-dark" : ""}
        >
            <div style={{ margin: 15 }}>
                <p>
                    {t("map.newDialogText") as string}
                </p>
                <Button
                    onClick={onClick}
                    text={t("map.new") as string}
                    intent="danger"
                    style={{ marginRight: 10 }}
                />
                <Button
                    onClick={props.onClose}
                    text={t("map.newDialogCancel") as string}
                />
            </div>
        </Dialog>
    )
}
