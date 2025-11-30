import React from "react";
import {useTranslation} from "react-i18next";
import MapAsset from "../../../../../types/li/MapAsset";
import ImageUpload from "../../../util/ImageUpload";
import useSelectedElemProp from "../../../../../hooks/elements/useSelectedElemProperty";
import useSelectedElemType from "../../../../../hooks/elements/useSelectedElemType";
import LazyCollapse from "../../../util/LazyCollapse";
import SpriteMorePanel from "./SpriteMorePanel";
import {Box, Button} from "@mui/material";
import AnimatedCaretIcon from "../../../../utils/AnimatedCaretIcon";
import LISpriteAnimation from "../../../../../types/li/LISpriteAnimation";

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
    const [, setAnimation] = useSelectedElemProp("animation");
    const [color, setColor] = useSelectedElemProp("color");
    const selectedType = useSelectedElemType();
    const [isMoreOpen, setIsMoreOpen] = React.useState(false);

    const onUpload = React.useCallback((asset: MapAsset) => {
        setSpriteID(asset.id);
        setAnimation(undefined);
        setColor(undefined);
    }, [setSpriteID, setAnimation, setColor]);

    const onUploadAnimation = React.useCallback((animation: LISpriteAnimation) => {
        if (!animation.frames.length)
            return;

        setAnimation(animation);
        setSpriteID(animation.frames[0].spriteID);
        setColor(undefined);
    }, [setAnimation, setSpriteID, setColor]);

    const onReset = React.useCallback(() => {
        setAnimation(undefined);
        setSpriteID(undefined);
        setColor(undefined);
    }, [setAnimation, setSpriteID, setColor]);

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
                <SpriteMorePanel/>
            </LazyCollapse>
        </Box>
    );
}
