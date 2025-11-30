import {Box, Button, ButtonGroup, CircularProgress} from "@mui/material";
import {useMapAssetValue} from "../../../../../hooks/assets/useMapAsset";
import {useSelectedElemPropValue} from "../../../../../hooks/elements/useSelectedElemProperty";
import ElementPropSwitch from "../../../input/elementProps/ElementPropSwitch";
import React from "react";
import useSelectedElemType from "../../../../../hooks/elements/useSelectedElemType";
import {useTranslation} from "react-i18next";
import {Download, Gradient} from "@mui/icons-material";
import {convertImageAssetToDDS} from "../../../../../utils/dds/convertImageToDDS";
import useDownloadMapAsset from "../../../../../hooks/assets/useDownloadMapAsset";
import {useSelectedElemValue} from "../../../../../hooks/elements/useSelectedElem";
import useDownloadElementAsPNG from "../../../../../hooks/assets/useDownloadElementAsPNG";

export default function SpriteMorePanel() {
    const {t} = useTranslation();
    const selectedType = useSelectedElemType();
    const spriteID = useSelectedElemPropValue("spriteID");
    const asset = useMapAssetValue(spriteID);
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

    if (!spriteID || !asset)
        return null;

    const isGIF = asset?.blob.type === "image/gif";
    const isDDS = asset?.blob.type === "image/dds";
    const isCustomAnim = selectedType?.startsWith("sab-door") || selectedType?.startsWith("util-vent");

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
                    onClick={() => downloadRaw({id: spriteID, fileName})}
                >
                    <Download
                        sx={{marginRight: 0.5}}
                        fontSize={"small"}
                    />
                    {t("sprite.downloadAsType", {type: assetType || "N/A"})}
                </Button>
                {isDDS && (
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
                {!isDDS && !isGIF && (
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

            {isGIF && (
                <ElementPropSwitch
                    name={t("sprite.loop")}
                    prop="loopGIF"
                    defaultValue={!isCustomAnim}
                    disabled={isCustomAnim}
                />
            )}
        </Box>
    );
}