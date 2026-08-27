import {useTranslation} from "react-i18next";
import {IconButton, Tooltip} from "@mui/material";
import {ContentCopy} from "@mui/icons-material";
import React from "react";
import {copySelectedElementsToClipboard} from "../../editor/clipboard/elements/copyElementsToClipboard";

export default function CopyButton() {
    const {t} = useTranslation();

    return (
        <Tooltip title={t("edit.copy")}>
            <IconButton onClick={copySelectedElementsToClipboard}>
                <ContentCopy/>
            </IconButton>
        </Tooltip>
    );
}