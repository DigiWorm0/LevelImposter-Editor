import React from "react";
import {useTranslation} from "react-i18next";
import {CircularProgress, IconButton, Tooltip} from "@mui/material";
import {FolderZip} from "@mui/icons-material";
import useToaster from "../../hooks/useToaster";
import useSaveCompressedMap from "../../hooks/fileio/useSaveCompressedMap";

export default function CompressMapButton() {
    const {t} = useTranslation();
    const saveMap = useSaveCompressedMap();
    const toaster = useToaster();
    const [isSaving, setIsSaving] = React.useState(false);

    const onClick = React.useCallback(() => {
        setIsSaving(true);
        saveMap()
            .catch(toaster.error)
            .finally(() => setIsSaving(false));
    }, [saveMap, toaster]);

    return (
        <Tooltip title={t("map.saveCompressed")}>
            <IconButton
                onClick={onClick}
                disabled={isSaving}
            >
                {isSaving && (<CircularProgress color={"inherit"} size={24}/>)}
                {!isSaving && (<FolderZip/>)}
            </IconButton>
        </Tooltip>
    );
}