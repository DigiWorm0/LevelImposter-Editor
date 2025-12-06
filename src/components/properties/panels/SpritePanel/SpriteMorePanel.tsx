import {Box, Button, ButtonGroup, CircularProgress} from "@mui/material";
import useMapAsset from "../../../../hooks/assets/useMapAsset";
import {useSelectedElemPropValue} from "../../../../hooks/elements/useSelectedElemProperty";
import React from "react";
import {useTranslation} from "react-i18next";
import {Animation, Download, Gradient} from "@mui/icons-material";
import {convertImageAssetToDDS} from "../../../../utils/dds/convertImageToDDS";
import useDownloadMapAsset from "../../../../hooks/assets/useDownloadMapAsset";
import {useSelectedElemValue} from "../../../../hooks/elements/useSelectedElem";
import useDownloadElementAsPNG from "../../../../hooks/assets/useDownloadElementAsPNG";
import useSpriteAnimEditorOpen from "../../../../hooks/spriteAnim/useSpriteAnimEditorOpen";

export default function SpriteMorePanel() {
    const {t} = useTranslation();
    const spriteID = useSelectedElemPropValue("spriteID");
    const asset = useMapAsset(spriteID);
    const selectedElem = useSelectedElemValue();
    const [isAnimEditorOpen, setAnimEditorOpen] = useSpriteAnimEditorOpen();

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
        <Box sx={{p: 1}}>
            <ButtonGroup orientation={"vertical"} fullWidth>
                <Button
                    variant={"outlined"}
                    color={"secondary"}
                    size={"small"}
                    fullWidth
                    onClick={() => setAnimEditorOpen(true)}
                    disabled={isAnimEditorOpen}
                >
                    <Animation
                        sx={{marginRight: 0.5}}
                        fontSize={"small"}
                    />
                    {t("sprite.editAnimation")}
                </Button>
                {hasSprite && (
                    <Button
                        variant={"outlined"}
                        color={"secondary"}
                        size={"small"}
                        fullWidth
                        onClick={() => downloadRaw({id: spriteID, fileName})}
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
                        onClick={() => convertImageAssetToDDS(spriteID).catch(console.error)}
                    >
                        <Gradient
                            sx={{marginRight: 0.5}}
                            fontSize={"small"}
                        />
                        {t("sprite.convertToDDS")}
                    </Button>
                )}
            </ButtonGroup>
        </Box>
    );
}