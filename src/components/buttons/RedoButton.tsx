import { useTranslation } from "react-i18next";
import { useCanRedo, useRedo } from "../../hooks/map/useHistory";
import { IconButton, Tooltip } from "@mui/material";
import { Redo } from "@mui/icons-material";
import React from "react";

export default function RedoButton() {
    const { t } = useTranslation();
    const redo = useRedo();
    const canRedo = useCanRedo();

    return (
        <Tooltip title={t("edit.redo")}>
            <IconButton onClick={redo} disabled={!canRedo}>
                <Redo />
            </IconButton>
        </Tooltip>
    );
}