import { useTranslation } from "react-i18next";
import { IconButton, Tooltip } from "@mui/material";
import { Undo } from "@mui/icons-material";
import React from "react";
import { useUndo } from "../../hooks/map/history/useUndoRedo";
import { useCanUndo } from "../../hooks/map/history/useCanUndoRedo";

export default function UndoButton() {
    const { t } = useTranslation();
    const undo = useUndo();
    const canUndo = useCanUndo();

    return (
        <Tooltip title={t("edit.undo")}>
            <IconButton onClick={undo} disabled={!canUndo}>
                <Undo />
            </IconButton>
        </Tooltip>
    );
}