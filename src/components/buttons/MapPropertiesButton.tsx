import React from "react";
import { useTranslation } from "react-i18next";
import MapPropertiesModal from "../modals/MapPropertiesModal";
import { IconButton, Tooltip } from "@mui/material";
import { Map } from "@mui/icons-material";

export default function MapPropertiesButton() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <Tooltip title={t("settings.map.title")}>
                <IconButton onClick={() => setIsOpen(true)}>
                    <Map />
                </IconButton>
            </Tooltip>

            <MapPropertiesModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}