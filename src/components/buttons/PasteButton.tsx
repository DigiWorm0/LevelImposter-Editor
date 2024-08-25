import {useTranslation} from "react-i18next";
import usePasteElement from "../../hooks/input/usePasteElement";
import {IconButton, Tooltip} from "@mui/material";
import {ContentPaste} from "@mui/icons-material";
import React from "react";

export default function PasteButton() {
    const {t} = useTranslation();
    const pasteElement = usePasteElement();

    return (
        <Tooltip title={t("edit.paste")}>
            <IconButton onClick={pasteElement}>
                <ContentPaste/>
            </IconButton>
        </Tooltip>
    );
}