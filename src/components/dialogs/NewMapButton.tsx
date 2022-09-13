import { Button, Classes, Dialog } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import React from "react";
import { useMapReset } from "../../hooks/jotai/useMap";
import { useSetSelectedColliderID } from "../../hooks/jotai/useSelectedCollider";
import { useSetSelectedElemID } from "../../hooks/jotai/useSelectedElem";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import useTranslation from "../../hooks/useTranslation";

export default function NewMapButton() {
    const translation = useTranslation();
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
                content={translation.NewFile}
                position="bottom">

                <Button
                    className={Classes.MINIMAL}
                    icon="document"
                    onClick={() => { setIsVisible(true); }} />

            </Tooltip2>

            <Dialog
                isOpen={isVisible}
                onClose={() => { setIsVisible(false); }}
                title={translation.NewFile}
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}>

                <div style={{ margin: 15 }}>
                    <p>Are you sure you want to create a new map?</p>
                    <p>This will delete all elements and reset the map.</p>

                    <Button onClick={() => { onClear(); }} text={translation.Yes} intent="danger" style={{ marginRight: 10 }} />
                    <Button onClick={() => { setIsVisible(false); }} text={translation.Cancel} />
                </div>
            </Dialog>
        </>
    );
}