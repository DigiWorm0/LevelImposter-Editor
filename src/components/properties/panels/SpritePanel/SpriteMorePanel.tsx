import {Box, Button, ButtonGroup} from "@mui/material";
import {useMapAssetValue} from "../../../../hooks/assets/useMapAsset";
import {useSelectedElemPropValue} from "../../../../hooks/elements/useSelectedElemProperty";
import ElementPropSwitch from "../../input/elementProps/ElementPropSwitch";
import React from "react";
import useSelectedElemType from "../../../../hooks/elements/useSelectedElemType";
import {useTranslation} from "react-i18next";
import {AspectRatio, Crop} from "@mui/icons-material";
import useAutoCropSprite from "../../../../hooks/canvas/useAutoCropSprite";
import useAutoScaleSprite from "../../../../hooks/canvas/useAutoScaleSprite";

export default function SpriteMorePanel() {
    const {t} = useTranslation();
    const selectedType = useSelectedElemType();
    const spriteID = useSelectedElemPropValue("spriteID");
    const asset = useMapAssetValue(spriteID);
    const autoCrop = useAutoCropSprite();
    const autoScale = useAutoScaleSprite();

    const isGIF = asset?.blob.type === "image/gif";
    const isCustomAnim = selectedType?.startsWith("sab-door") || selectedType?.startsWith("util-vent");

    return (
        <>
            <Box sx={{p: 1}}>
                <ButtonGroup orientation={"vertical"} fullWidth>
                    <Button
                        variant={"outlined"}
                        color={"secondary"}
                        size={"small"}
                        fullWidth
                        onClick={() => autoScale()}
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
                        onClick={autoCrop}
                    >
                        <Crop
                            sx={{marginRight: 0.5}}
                            fontSize={"small"}
                        />
                        {t("sprite.cropToContent")}
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
        </>
    );
}