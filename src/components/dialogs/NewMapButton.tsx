import { clearElements } from "../../hooks/useElement";
import { clearMap } from "../../hooks/useMap";
import { Button, Classes, Dialog, ProgressBar } from "@blueprintjs/core";
import React from "react";
import { setSelection } from "../../hooks/useSelected";
import { setColliderEditing } from "../../hooks/useColliderEditing";
import useSettings from "../../hooks/useSettings";
import GUID from "../../types/generic/GUID";

export default function NewMapButton() {
    const [settings] = useSettings();
    const [isVisible, setIsVisible] = React.useState(false);
    const [isClearing, setIsClearing] = React.useState(false);

    const onClear = () => {
        clearElements();
        clearMap();
        setSelection("" as GUID);
        setColliderEditing("" as GUID);
        setIsVisible(false);
    }

    React.useEffect(() => {
        if (isClearing) {
            onClear();
            setIsClearing(false);
        }
    })


    return (
        <>
            <Button
                className={Classes.MINIMAL}
                icon="document"
                text="New"
                onClick={() => { setIsVisible(true); }} />

            <Dialog
                isOpen={isVisible}
                onClose={() => { setIsVisible(false); }}
                title="New Map"
                portalClassName={settings.isDarkMode ? "bp4-dark" : ""}>

                <div style={{ margin: 15 }}>
                    <p>Are you sure you want to create a new map?</p>
                    <p>This will delete all elements and reset the map.</p>

                    <Button onClick={() => { setIsClearing(true); }} text="Yes" intent="danger" style={{ marginRight: 10 }} />
                    <Button onClick={() => { setIsVisible(false); }} text="Cancel" />

                    {
                        isClearing &&
                        <div style={{ marginTop: 15 }}>
                            <ProgressBar intent="danger" />
                        </div>
                    }
                </div>
            </Dialog>
        </>
    );
}