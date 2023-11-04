import { AnchorButton, Classes } from "@blueprintjs/core";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import React from "react";
import MapAssetsDialog from "./MapAssetsDialog";

export default function MapAssetsButton() {
    const settings = useSettingsValue();
    const [isOpen, setIsOpen] = React.useState(false);

    if (settings.isDevMode !== true)
        return null;
    return (
        <>
            <AnchorButton
                className={Classes.MINIMAL}
                icon={"database"}
                onClick={() => setIsOpen(true)}
            />
            {/* Prevent rendering while hidden */}
            {isOpen && (
                <MapAssetsDialog
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}