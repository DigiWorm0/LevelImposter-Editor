import {Box, Button, ButtonGroup, Typography} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import ImageUpload from "../util/ImageUpload";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import SpriteDownloadRawButton from "../../buttons/SpriteDownloadRawButton";
import SpriteDownloadPNGButton from "../../buttons/SpriteDownloadPNGButton";
import AnimatedCaretIcon from "../../utils/AnimatedCaretIcon";
import LazyCollapse from "../util/LazyCollapse";
import {MapAsset} from "@editor/assets/assetsStore";
import {generateGUID} from "@/shared/types/GUID";

interface MinigameEditorPanelProps {
    minigameType: string;
    onFinish: () => void;
    hideName?: boolean;
}

export default function MinigameEditorPanel(props: MinigameEditorPanelProps) {
    const {t} = useTranslation();
    const [minigames, setMinigames] = useSelectedElemProp("minigames");
    const [isMoreOpen, setIsMoreOpen] = React.useState(false);

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
        <Box sx={{p: 2}}>
            {!props.hideName && (
                <Typography variant={"subtitle2"}>
                    {t(`minigame.${splitMinigameType[1]}`, {index: splitMinigameType[2]})}
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

            <Button
                variant={isMoreOpen ? "contained" : "text"}
                color={"primary"}
                size={"small"}
                fullWidth
                sx={{marginTop: 1}}
                onClick={() => setIsMoreOpen(!isMoreOpen)}
            >
                {t("sprite.more")}
                <AnimatedCaretIcon up={!isMoreOpen}/>
            </Button>
            <LazyCollapse in={isMoreOpen}>
                <Box sx={{p: 1}}>
                    <ButtonGroup orientation={"vertical"} fullWidth>
                        <SpriteDownloadRawButton assetID={minigame?.spriteID}/>
                        <SpriteDownloadPNGButton assetID={minigame?.spriteID}/>
                    </ButtonGroup>
                </Box>
            </LazyCollapse>
        </Box>
    );
}