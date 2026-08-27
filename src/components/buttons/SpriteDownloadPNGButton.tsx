import {Download} from "@mui/icons-material";
import {Button, CircularProgress, IconButton, Tooltip} from "@mui/material";
import React from "react";
import useAsset from "../../hooks/assets/useAsset";
import GUID from "../../types/common/GUID";
import {useTranslation} from "react-i18next";
import {downloadAssetAsPNG} from "@editor/assets/downloadAsset";

export interface SpriteDownloadPNGButtonProps {
    assetID: GUID | undefined;
    small?: boolean;
}

export default function SpriteDownloadPNGButton(props: SpriteDownloadPNGButtonProps) {
    const {t} = useTranslation();
    const asset = useAsset(props.assetID);
    const [isDownloadingPNG, setIsDownloadingPNG] = React.useState(false);

    const onClick = React.useCallback(() => {
        if (isDownloadingPNG)
            return;

        setIsDownloadingPNG(true);
        downloadAssetAsPNG(props.assetID)
            .finally(() => setIsDownloadingPNG(false));
    }, [props.assetID, isDownloadingPNG]);

    const isDDS = asset?.blob.type === "image/dds";

    if (!asset || !isDDS)
        return null;

    if (props.small)
        return (
            <Tooltip title={t("sprite.downloadAsPNG")}>
                <IconButton
                    color={"secondary"}
                    size={"small"}
                    disabled={isDownloadingPNG}
                    onClick={onClick}
                >
                    {isDownloadingPNG ? (
                        <CircularProgress
                            size={16}
                            color={"inherit"}
                        />
                    ) : (
                        <Download
                            fontSize={"small"}
                        />
                    )}
                </IconButton>
            </Tooltip>
        );

    return (
        <Button
            variant={"outlined"}
            color={"secondary"}
            size={"small"}
            fullWidth
            disabled={isDownloadingPNG}
            onClick={onClick}
        >
            {isDownloadingPNG && (
                <CircularProgress
                    sx={{marginRight: 0.5}}
                    size={16}
                    color={"inherit"}
                />
            )}
            {!isDownloadingPNG && (
                <Download
                    sx={{marginRight: 0.5}}
                    fontSize={"small"}
                />
            )}
            {t("sprite.downloadAsPNG")}
        </Button>
    );
}