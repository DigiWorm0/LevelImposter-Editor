import {useTranslation} from "react-i18next";
import {IconButton, Tooltip} from "@mui/material";
import {Undo} from "@mui/icons-material";
import React from "react";
import {useAtomValue} from "jotai";
import {canUndoAtom} from "@editor/state/historyStore";
import {undo} from "@editor/history/undoRedo";

export default function UndoButton() {
    const {t} = useTranslation();
    const canUndo = useAtomValue(canUndoAtom);

    return (
        <Tooltip title={t("edit.undo")}>
            <span>
                <IconButton onClick={undo} disabled={!canUndo}>
                    <Undo/>
                </IconButton>
            </span>
        </Tooltip>
    );
}