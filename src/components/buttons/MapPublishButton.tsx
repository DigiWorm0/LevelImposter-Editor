import React from "react";
import { useTranslation } from "react-i18next";
import PublishModal from "../modals/Publish/PublishModal";
import { IconButton, Tooltip } from "@mui/material";
import { Publish } from "@mui/icons-material";

export default function MapPublishButton() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
        <>
            <Tooltip title={t("publish.title")}>
                <IconButton onClick={() => setIsOpen(true)}>
                    <Publish />
                </IconButton>
            </Tooltip>

            <PublishModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}