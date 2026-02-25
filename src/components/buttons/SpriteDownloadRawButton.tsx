import {Download} from "@mui/icons-material";
import {Button, IconButton, Tooltip} from "@mui/material";
import React from "react";
import useMapAsset from "../../hooks/assets/useMapAsset";
import GUID from "../../types/common/GUID";
import {useTranslation} from "react-i18next";
import useDownloadMapAsset from "../../hooks/assets/useDownloadMapAsset";

export interface SpriteDownloadRawButtonProps {
    assetID: GUID | undefined;
    small?: boolean;
}

export default function SpriteDownloadRawButton(props: SpriteDownloadRawButtonProps) {
    const {t} = useTranslation();
    const asset = useMapAsset(props.assetID);
    const downloadRaw = useDownloadMapAsset();

    const fileName = asset?.id ?? "sprite";
    const assetType = asset?.blob.type.split("/")[1].toLowerCase();

    const onClick = React.useCallback(() => {
        if (!asset)
            return;

        downloadRaw({id: props.assetID, fileName});
    }, [downloadRaw, props.assetID, fileName, asset]);

    if (!asset)
        return null;

    if (props.small)
        return (
            <Tooltip title={t("sprite.downloadAsType", {type: assetType || "N/A"})}>
                <IconButton
                    color={"primary"}
                    size={"small"}
                    onClick={onClick}
                >
                    <Download fontSize={"small"}/>
                </IconButton>
            </Tooltip>
        );

    return (
        <Button
            variant={"outlined"}
            color={"secondary"}
            size={"small"}
            fullWidth
            onClick={onClick}
        >
            <Download
                sx={{marginRight: 0.5}}
                fontSize={"small"}
            />
            {t("sprite.downloadAsType", {type: assetType || "N/A"})}
        </Button>
    );
}