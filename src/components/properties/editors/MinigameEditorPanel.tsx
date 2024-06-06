import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import MapAsset from "../../../types/li/MapAsset";
import generateGUID from "../../../utils/generateGUID";
import ImageUpload from "../util/ImageUpload";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";

interface MinigameEditorPanelProps {
    minigameType: string;
    onFinish: () => void;
    hideName?: boolean;
}

export default function MinigameEditorPanel(props: MinigameEditorPanelProps) {
    const { t } = useTranslation();
    const [minigames, setMinigames] = useSelectedElemProp("minigames");

    const minigameType = props.minigameType;
    const splitMinigameType = minigameType.split("_");
    const minigame = minigames?.find(mg => mg.type === minigameType);

    const onReset = React.useCallback(() => {
        const minigameList = minigames?.filter(minigame => minigame.type !== minigameType) ?? [];
        setMinigames(minigameList);
    }, [minigames, setMinigames]);

    const onUpload = React.useCallback((asset: MapAsset) => {

        // Update the minigame sprite ID
        const newMinigames = minigames?.map(mg => ({
            ...mg,
            spriteID: mg.id === minigame?.id ? asset.id : mg.spriteID
        })) ?? [];

        // If the minigame is not in the list, add it
        if (!newMinigames.find(mg => mg.type === minigameType)) {
            newMinigames.push({
                id: generateGUID(),
                type: minigameType,
                spriteID: asset.id,
            });
        }

        // Update the minigames
        setMinigames(newMinigames);

    }, [minigames, minigame, setMinigames]);

    return (
        <Box sx={{ p: 2 }}>
            {!props.hideName && (
                <Typography variant={"subtitle2"}>
                    {t(`minigame.${splitMinigameType[1]}`, { index: splitMinigameType[2] })}
                </Typography>
            )}
            <ImageUpload
                name={minigameType}
                defaultSpriteURL={`/minigames/${minigameType}.png`}
                assetID={minigame?.spriteID}
                onUpload={onUpload}
                onReset={onReset}
                onFinish={props.onFinish}
            />
        </Box>
    )
}