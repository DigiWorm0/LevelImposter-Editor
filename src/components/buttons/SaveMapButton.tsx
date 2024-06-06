import React from "react";
import { useTranslation } from "react-i18next";
import useSaveMap from "../../hooks/fileio/useSaveMap";
import { IconButton, Tooltip } from "@mui/material";
import { Save } from "@mui/icons-material";
import useToaster from "../../hooks/useToaster";

export default function SaveMapButton() {
    const { t } = useTranslation();
    const saveMap = useSaveMap();
    const toaster = useToaster();

    const onClick = React.useCallback(() => {
        saveMap().catch(toaster.error);
    }, [saveMap, toaster]);

    return (
        <Tooltip title={t("map.save")}>
            <IconButton onClick={onClick}>
                <Save />
            </IconButton>
        </Tooltip>
    );
}