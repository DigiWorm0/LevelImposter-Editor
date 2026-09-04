import React from "react";
import {useTranslation} from "react-i18next";
import {CircularProgress, IconButton, Tooltip} from "@mui/material";
import {Save} from "@mui/icons-material";
import useToaster from "../toast/useToaster";
import {downloadMapFile} from "@editor/fileio/download/downloadMapFile";

export default function SaveMapButton() {
    const {t} = useTranslation();
    const toaster = useToaster();
    const [isSaving, setIsSaving] = React.useState(false);

    const onClick = React.useCallback(() => {
        setIsSaving(true);
        downloadMapFile("standard")
            .catch(toaster.error)
            .finally(() => setIsSaving(false));
    }, [toaster]);

    return (
        <Tooltip title={t("map.save")}>
            <IconButton
                onClick={onClick}
                disabled={isSaving}
            >
                {isSaving && (<CircularProgress color={"inherit"} size={24}/>)}
                {!isSaving && (<Save/>)}
            </IconButton>
        </Tooltip>
    );
}