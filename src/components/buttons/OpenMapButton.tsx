import { useTranslation } from "react-i18next";
import { useOpenMap } from "../../hooks/fileio/useOpenMap";
import { IconButton, Tooltip } from "@mui/material";
import { FolderOutlined } from "@mui/icons-material";
import React from "react";
import useToaster from "../../hooks/useToaster";

export default function OpenMapButton() {
    const { t } = useTranslation();
    const toaster = useToaster();
    const openMapFile = useOpenMap();

    return (
        <Tooltip title={t("map.open")}>
            <IconButton onClick={() => openMapFile().catch(() => toaster.error({ code: "map/open" }))}>
                <FolderOutlined />
            </IconButton>
        </Tooltip>
    );
}