import React from "react";
import {useTranslation} from "react-i18next";
import useSaveMap from "../../hooks/fileio/useSaveMap";
import {CircularProgress, IconButton, Tooltip} from "@mui/material";
import {Save} from "@mui/icons-material";
import useToaster from "../../hooks/useToaster";

export default function SaveMapButton() {
    const {t} = useTranslation();
    const saveMap = useSaveMap();
    const toaster = useToaster();
    const [isSaving, setIsSaving] = React.useState(false);

    const onClick = React.useCallback(() => {
        setIsSaving(true);
        saveMap()
            .catch(toaster.error)
            .finally(() => setIsSaving(false));
    }, [saveMap, toaster]);

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