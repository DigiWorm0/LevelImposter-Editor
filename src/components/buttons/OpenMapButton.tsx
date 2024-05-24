import { useTranslation } from "react-i18next";
import { useOpenMap } from "../../hooks/fileio/useOpenMap";
import { IconButton, Tooltip } from "@mui/material";
import { FolderOutlined } from "@mui/icons-material";
import React from "react";

export default function OpenMapButton() {
    const { t } = useTranslation();
    const openMapFile = useOpenMap();

    return (
        <Tooltip title={t("map.open")}>
            <IconButton onClick={() => openMapFile({})}>
                <FolderOutlined />
            </IconButton>
        </Tooltip>
    );
}