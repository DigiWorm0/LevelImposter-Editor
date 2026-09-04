import {convertImageAssetToDDS} from "@editor/assets/dds/convertImageToDDS";
import {Gradient} from "@mui/icons-material";
import {Button} from "@mui/material";
import React from "react";
import GUID from "@shared/types/GUID";
import {useTranslation} from "react-i18next";
import {useAtomValue} from "jotai";
import {assetsAtomFamily} from "@editor/assets/assetsStore";

export interface SpriteConvertToDDSButtonProps {
    assetID: GUID | undefined;
}

export default function SpriteConvertToDDSButton(props: SpriteConvertToDDSButtonProps) {
    const {t} = useTranslation();
    const asset = useAtomValue(assetsAtomFamily(props.assetID));

    const isGIF = asset?.blob.type === "image/gif";
    const isDDS = asset?.blob.type === "image/dds";

    if (!asset || isGIF || isDDS)
        return null;
    return (
        <Button
            variant={"outlined"}
            color={"secondary"}
            size={"small"}
            fullWidth
            onClick={() => convertImageAssetToDDS(props.assetID).catch(console.error)}
        >
            <Gradient
                sx={{marginRight: 0.5}}
                fontSize={"small"}
            />
            {t("sprite.convertToDDS")}
        </Button>
    );
}