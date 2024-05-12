import { Button, Tooltip } from "@blueprintjs/core";
import { useSettingsValue } from "../../hooks/useSettings";
import React from "react";
import MapAssetsModal from "../modals/MapAssetsModal";
import { useTranslation } from "react-i18next";

export default function MapAssetsButton() {
    const { isDevMode } = useSettingsValue();
    const [isOpen, setIsOpen] = React.useState(false);
    const { t } = useTranslation();

    if (!isDevMode)
        return null;
    return (
        <>
            <Tooltip
                content={t("edit.mapAssets") as string}
                position="bottom"
            >
                <Button
                    minimal
                    icon={"database"}
                    onClick={() => setIsOpen(true)}
                />
            </Tooltip>

            <MapAssetsModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}