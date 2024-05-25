import { useTranslation } from "react-i18next";
import { IconButton, Tooltip } from "@mui/material";
import { Redo } from "@mui/icons-material";
import React from "react";
import { useRedo } from "../../hooks/map/history/useUndoRedo";
import { useCanRedo } from "../../hooks/map/history/useCanUndoRedo";

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