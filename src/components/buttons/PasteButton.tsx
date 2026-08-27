import {useTranslation} from "react-i18next";
import {IconButton, Tooltip} from "@mui/material";
import {ContentPaste} from "@mui/icons-material";
import React from "react";
import {pasteElementsFromClipboard} from "../../editor/clipboard/elements/pasteElementsFromClipboard";

export default function PasteButton() {
    const {t} = useTranslation();

    return (
        <Tooltip title={t("edit.paste")}>
            <IconButton onClick={pasteElementsFromClipboard}>
                <ContentPaste/>
            </IconButton>
        </Tooltip>
    );
}