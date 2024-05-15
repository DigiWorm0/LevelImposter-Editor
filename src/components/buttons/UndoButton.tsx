import { useTranslation } from "react-i18next";
import { useCanUndo, useUndo } from "../../hooks/map/useHistory";
import { IconButton, Tooltip } from "@mui/material";
import { Undo } from "@mui/icons-material";
import React from "react";

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