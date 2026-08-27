import {useTranslation} from "react-i18next";
import {IconButton, Tooltip} from "@mui/material";
import {Redo} from "@mui/icons-material";
import React from "react";
import {canRedoAtom} from "@editor/state/historyStore";
import {redo} from "@editor/history/undoRedo";
import {useAtomValue} from "jotai";

export default function RedoButton() {
    const {t} = useTranslation();
    const canRedo = useAtomValue(canRedoAtom);

    return (
        <Tooltip title={t("edit.redo")}>
            <span>
                <IconButton
                    onClick={redo}
                    disabled={!canRedo}
                >
                    <Redo/>
                </IconButton>
            </span>
        </Tooltip>
    );
}