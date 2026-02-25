import React from "react";
import {useTranslation} from "react-i18next";
import MapAsset from "../../../../types/li/MapAsset";
import ImageUpload from "../../util/ImageUpload";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";
import useSelectedElemType from "../../../../hooks/elements/useSelectedElemType";
import LazyCollapse from "../../util/LazyCollapse";
import SpriteMorePanel from "./SpriteMorePanel";
import {Box, Button, ButtonGroup} from "@mui/material";
import AnimatedCaretIcon from "../../../utils/AnimatedCaretIcon";
import LISpriteAnimation from "../../../../types/li/LISpriteAnimation";
import {getSubAnimationsFromElementType} from "../../../../utils/gif/convertGIFToSpriteAnimation";
import {Animation} from "@mui/icons-material";
import useSpriteAnimEditorOpen from "../../../../hooks/spriteAnim/useSpriteAnimEditorOpen";

const TYPE_BLACKLIST = [
    "util-player",
    "util-room",
    "util-spawn1",
    "util-spawn2",
    "util-sound1",
    "util-sound2",
    "util-tele",
    "util-layer",
    "util-meeting",
    "util-triggerrepeat",
    "util-triggersound",
    "util-triggerrand",
    "util-triggertimer",
    "util-triggerstart",
    "util-triggeranim",
    "util-dummy",
    "util-display",
    "util-onewaycollider",
    "util-decontamination",
    "util-sabotages",
    "util-binocularscollider",
    "util-ghostcollider",
    "util-eject",
    "util-triggergate",
    "util-valuebool",
    "util-valueboolpreset",
    "util-valuecomparator"
];

export default function StillSpritePanel() {
    const {t} = useTranslation();
    const [spriteID, setSpriteID] = useSelectedElemProp("spriteID");
    const [animations, setAnimations] = useSelectedElemProp("animations");
    const [color, setColor] = useSelectedElemProp("color");
    const selectedType = useSelectedElemType();
    const [isMoreOpen, setIsMoreOpen] = React.useState(false);
    const [isAnimEditorOpen, setAnimEditorOpen] = useSpriteAnimEditorOpen();

    const onUpload = React.useCallback((asset: MapAsset) => {
        setSpriteID(asset.id);
        setAnimations(undefined);
        setColor(undefined);
    }, [setSpriteID, setAnimations, setColor]);

    const onUploadAnimation = React.useCallback((animation: LISpriteAnimation) => {
        if (animation.frames.length === 0)
            return;

        setAnimations(getSubAnimationsFromElementType(selectedType || "", animation.frames));
        setSpriteID(animation.frames[0].spriteID);
        setColor(undefined);
    }, [setAnimations, setSpriteID, setColor]);

    const onReset = React.useCallback(() => {
        setAnimations(undefined);
        setSpriteID(undefined);
        setColor(undefined);
    }, [setAnimations, setSpriteID, setColor]);

    if (!selectedType || TYPE_BLACKLIST.includes(selectedType))
        return null;

    return (
        <Box>
            <ImageUpload
                name={selectedType}
                assetID={spriteID}
                onUpload={onUpload}
                onUploadAnimation={onUploadAnimation}
                onReset={onReset}
                color={color}
                onColorChange={setColor}
                isAnimated={animations !== undefined}
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

                        <SpriteMorePanel spriteID={spriteID}/>
                    </ButtonGroup>
                </Box>
            </LazyCollapse>
        </Box>
    );
}
