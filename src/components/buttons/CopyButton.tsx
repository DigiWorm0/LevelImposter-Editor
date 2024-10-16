import {useTranslation} from "react-i18next";
import useCopyElement from "../../hooks/input/useCopyElement";
import {IconButton, Tooltip} from "@mui/material";
import {ContentCopy} from "@mui/icons-material";
import React from "react";

export default function CopyButton() {
    const {t} = useTranslation();
    const copyElement = useCopyElement();

    return (
        <Tooltip title={t("edit.copy")}>
            <IconButton onClick={copyElement}>
                <ContentCopy/>
            </IconButton>
        </Tooltip>
    );
}