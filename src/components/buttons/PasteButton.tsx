import { useTranslation } from "react-i18next";
import usePasteFromClipboard from "../../hooks/input/usePasteFromClipboard";
import { IconButton, Tooltip } from "@mui/material";
import { ContentPaste } from "@mui/icons-material";
import React from "react";

export default function PasteButton() {
    const { t } = useTranslation();
    const pasteElement = usePasteFromClipboard();

    return (
        <Tooltip title={t("edit.paste")}>
            <IconButton onClick={pasteElement}>
                <ContentPaste />
            </IconButton>
        </Tooltip>
    );
}