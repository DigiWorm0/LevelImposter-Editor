import { Button, Classes, Dialog } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMapReset } from "../../hooks/map/useMap";
import { useSetSelectedColliderID } from "../../hooks/map/elements/useSelectedCollider";
import { useSetSelectedElemID } from "../../hooks/map/elements/useSelectedElem";
import { useSettingsValue } from "../../hooks/useSettings";

export default function NewMapButton() {
    const { t } = useTranslation();
    const settings = useSettingsValue();
    const resetMap = useMapReset();
    const setSelectedID = useSetSelectedElemID();
    const setColliderID = useSetSelectedColliderID();
    const [isVisible, setIsVisible] = React.useState(false);

    const onClear = () => {
        resetMap();
        setSelectedID(undefined);
        setColliderID(undefined);
        setIsVisible(false);
    }

    return (
        <>
            <Tooltip2
                content={t("map.new") as string}
                position="bottom">

                <Button
                    className={Classes.MINIMAL}
                    icon="document"
                    onClick={() => {
                        setIsVisible(true);
                    }} />

            </Tooltip2>

            <Dialog
                isOpen={isVisible}
                onClose={() => {
                    setIsVisible(false);
                }}
                title={t("map.new") as string}
                portalClassName={settings.isDarkMode === false ? "" : "bp5-dark"}>

                <div style={{ margin: 15 }}>
                    <p>
                        {t("map.newDialogText") as string}
                    </p>

                    <Button
                        onClick={() => {
                            onClear();
                        }}
                        text={t("map.new") as string}
                        intent="danger"
                        style={{ marginRight: 10 }} />
                    <Button
                        onClick={() => {
                            setIsVisible(false);
                        }}
                        text={t("map.newDialogCancel") as string}
                    />
                </div>
            </Dialog>
        </>
    );
}