import {convertImageAssetToDDS} from "../../utils/dds/convertImageToDDS";
import {Gradient} from "@mui/icons-material";
import {Button} from "@mui/material";
import React from "react";
import useMapAsset from "../../hooks/assets/useMapAsset";
import GUID from "../../types/common/GUID";
import {useTranslation} from "react-i18next";

export interface SpriteConvertToDDSButtonProps {
    assetID: GUID | undefined;
}

export default function SpriteConvertToDDSButton(props: SpriteConvertToDDSButtonProps) {
    const {t} = useTranslation();
    const asset = useMapAsset(props.assetID);

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