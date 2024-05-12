import { AnchorButton, Classes } from "@blueprintjs/core";
import { useSettingsValue } from "../../hooks/useSettings";
import React from "react";
import MapAssetsDialog from "./MapAssetsDialog";

export default function MapAssetsButton() {
    const { isDevMode } = useSettingsValue();
    const [isOpen, setIsOpen] = React.useState(false);

    if (!isDevMode)
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