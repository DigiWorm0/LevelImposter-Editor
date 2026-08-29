import React from "react";
import {useTranslation} from "react-i18next";
import {CircularProgress, IconButton, Tooltip} from "@mui/material";
import {FolderZip} from "@mui/icons-material";
import useToaster from "../../hooks/useToaster";
import {downloadMapFile} from "@editor/fileio/downloadMapFile";

export default function CompressMapButton() {
    const {t} = useTranslation();
    const toaster = useToaster();
    const [isSaving, setIsSaving] = React.useState(false);

    const onClick = React.useCallback(() => {
        setIsSaving(true);
        downloadMapFile("compressed")
            .catch(toaster.error)
            .finally(() => setIsSaving(false));
    }, [toaster]);

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