import {useTranslation} from "react-i18next";
import {IconButton, Tooltip} from "@mui/material";
import {FolderOutlined} from "@mui/icons-material";
import React from "react";
import useToaster from "../../hooks/useToaster";
import {openMapFromFileDialog} from "@editor/fileio/openMapFromFileDialog";

export default function OpenMapButton() {
    const {t} = useTranslation();
    const toaster = useToaster();

    const onClick = React.useCallback(() => {
        openMapFromFileDialog()
            .then(map => toaster.success(t("map.opened", {name: map.name})))
            .catch(toaster.error);
    }, [toaster, t]);

    return (
        <Tooltip title={t("map.open")}>
            <IconButton onClick={onClick}>
                <FolderOutlined/>
            </IconButton>
        </Tooltip>
    );
}