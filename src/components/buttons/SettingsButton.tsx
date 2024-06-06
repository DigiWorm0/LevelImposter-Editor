import React from "react";
import { useTranslation } from "react-i18next";
import SettingsModal from "../modals/SettingsModal";
import { IconButton, Tooltip } from "@mui/material";
import { Settings } from "@mui/icons-material";

export default function SettingsButton() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <Tooltip title={t("settings.interface.title")}>
                <IconButton onClick={() => setIsOpen(true)}>
                    <Settings />
                </IconButton>
            </Tooltip>

            <SettingsModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}