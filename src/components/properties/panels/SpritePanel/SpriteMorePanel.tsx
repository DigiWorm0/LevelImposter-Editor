import {Button, CircularProgress} from "@mui/material";
import useMapAsset from "../../../../hooks/assets/useMapAsset";
import React from "react";
import {useTranslation} from "react-i18next";
import {Download, Gradient} from "@mui/icons-material";
import {convertImageAssetToDDS} from "../../../../utils/dds/convertImageToDDS";
import useDownloadMapAsset from "../../../../hooks/assets/useDownloadMapAsset";
import {useSelectedElemValue} from "../../../../hooks/elements/useSelectedElem";
import useDownloadElementAsPNG from "../../../../hooks/assets/useDownloadElementAsPNG";
import GUID from "../../../../types/common/GUID";

export interface SpriteMorePanelProps {
    spriteID: GUID | undefined;
}

export default function SpriteMorePanel(props: SpriteMorePanelProps) {
    const {t} = useTranslation();
    const asset = useMapAsset(props.spriteID);
    const selectedElem = useSelectedElemValue();

    const downloadRaw = useDownloadMapAsset();
    const _downloadPNG = useDownloadElementAsPNG();
    const [isDownloadingPNG, setIsDownloadingPNG] = React.useState(false);

    const downloadPNG = React.useCallback(async () => {
        if (isDownloadingPNG) return;
        setIsDownloadingPNG(true);
        try {
            await _downloadPNG(selectedElem?.id);
        } finally {
            setIsDownloadingPNG(false);
        }
    }, [isDownloadingPNG, _downloadPNG, selectedElem]);

    const hasSprite = Boolean(asset);
    const isGIF = asset?.blob.type === "image/gif";
    const isDDS = asset?.blob.type === "image/dds";

    const assetType = asset?.blob.type.split("/")[1].toLowerCase();
    const fileName = selectedElem?.name ?? asset?.id ?? "sprite";

    return (
        <>
            {hasSprite && (
                <Button
                    variant={"outlined"}
                    color={"secondary"}
                    size={"small"}
                    fullWidth
                    onClick={() => downloadRaw({id: props.spriteID, fileName})}
                >
                    <Download
                        sx={{marginRight: 0.5}}
                        fontSize={"small"}
                    />
                    {t("sprite.downloadAsType", {type: assetType || "N/A"})}
                </Button>
            )}
            {hasSprite && isDDS && (
                <Button
                    variant={"outlined"}
                    color={"secondary"}
                    size={"small"}
                    fullWidth
                    disabled={isDownloadingPNG}
                    onClick={downloadPNG}
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
            )}
            {hasSprite && !isDDS && !isGIF && (
                <Button
                    variant={"outlined"}
                    color={"secondary"}
                    size={"small"}
                    fullWidth
                    onClick={() => convertImageAssetToDDS(props.spriteID).catch(console.error)}
                >
                    <Gradient
                        sx={{marginRight: 0.5}}
                        fontSize={"small"}
                    />
                    {t("sprite.convertToDDS")}
                </Button>
            )}
        </>
    );
}