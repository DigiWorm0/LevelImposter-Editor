import React from "react";
import { useTranslation } from "react-i18next";
import useSaveMap from "../../hooks/fileio/useSaveMap";
import { IconButton, Tooltip } from "@mui/material";
import { Save } from "@mui/icons-material";

export default function SaveMapButton() {
    const { t } = useTranslation();
    const saveMap = useSaveMap();

    return (
        <Tooltip title={t("map.save")}>
            <IconButton onClick={() => saveMap({})}>
                <Save />
            </IconButton>
        </Tooltip>
    );
}