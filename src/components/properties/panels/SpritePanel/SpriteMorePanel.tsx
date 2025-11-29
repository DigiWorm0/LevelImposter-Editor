import {Box, Button, ButtonGroup} from "@mui/material";
import {useMapAssetValue} from "../../../../hooks/assets/useMapAsset";
import {useSelectedElemPropValue} from "../../../../hooks/elements/useSelectedElemProperty";
import ElementPropSwitch from "../../input/elementProps/ElementPropSwitch";
import React from "react";
import useSelectedElemType from "../../../../hooks/elements/useSelectedElemType";
import {useTranslation} from "react-i18next";
import {AspectRatio, Crop, Gradient} from "@mui/icons-material";
import {convertImageAssetToDDS} from "../../../../utils/dds/convertImageToDDS";

export default function SpriteMorePanel() {
    const {t} = useTranslation();
    const selectedType = useSelectedElemType();
    const spriteID = useSelectedElemPropValue("spriteID");
    const asset = useMapAssetValue(spriteID);

    const isGIF = asset?.blob.type === "image/gif";
    const isDDS = asset?.blob.type === "image/dds";
    const isCustomAnim = selectedType?.startsWith("sab-door") || selectedType?.startsWith("util-vent");

    return (
        <Box sx={{p: 1}}>
            <ButtonGroup orientation={"vertical"} fullWidth>
                <Button
                    variant={"outlined"}
                    color={"secondary"}
                    size={"small"}
                    fullWidth
                    onClick={() => {
                    }}
                >
                    <AspectRatio
                        sx={{marginRight: 0.5}}
                        fontSize={"small"}
                    />
                    {t("sprite.rasterizeScale")}
                </Button>
                <Button
                    variant={"outlined"}
                    color={"secondary"}
                    size={"small"}
                    fullWidth
                    onClick={() => {
                    }}
                >
                    <Crop
                        sx={{marginRight: 0.5}}
                        fontSize={"small"}
                    />
                    {t("sprite.cropToContent")}
                </Button>
                <Button
                    variant={"outlined"}
                    color={"secondary"}
                    size={"small"}
                    fullWidth
                    disabled={isDDS}
                    onClick={() => convertImageAssetToDDS(spriteID).catch(console.error)}
                >
                    <Gradient
                        sx={{marginRight: 0.5}}
                        fontSize={"small"}
                    />
                    {t("sprite.convertToDDS")}
                </Button>
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