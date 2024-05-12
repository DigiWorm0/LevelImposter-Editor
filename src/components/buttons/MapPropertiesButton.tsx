import { Button, Tooltip } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import MapPropertiesModal from "../modals/MapPropertiesModal";

export default function MapPropertiesButton() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <Tooltip
                content={t("settings.map.title") as string}
                position="bottom"
            >
                <Button
                    minimal
                    icon="map"
                    onClick={() => setIsOpen(true)}
                />
            </Tooltip>

            <MapPropertiesModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}