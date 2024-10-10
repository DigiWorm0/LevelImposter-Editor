import React from "react";
import {useTranslation} from "react-i18next";
import MapAsset from "../../../../types/li/MapAsset";
import getIsConsole from "../../../../utils/map/getIsConsole";
import ImageUpload from "../../util/ImageUpload";
import MapError from "../../util/MapError";
import PanelContainer from "../../util/PanelContainer";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";
import useSelectedElemType from "../../../../hooks/elements/useSelectedElemType";
import {Padding, PlayArrow, Visibility} from "@mui/icons-material";
import LazyCollapse from "../../util/LazyCollapse";
import SpriteMorePanel from "./SpriteMorePanel";
import {Button} from "@mui/material";
import AnimatedCaretIcon from "../../../utils/AnimatedCaretIcon";

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
    "util-triggerarea",
    "util-triggerrepeat",
    "util-triggersound",
    "util-triggerrand",
    "util-triggertimer",
    "util-triggerstart",
    "util-triggerdeath",
    "util-triggershake",
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
    "util-valuecomparator"
];

export default function SpritePanel() {
    const {t} = useTranslation();
    const [spriteID, setSpriteID] = useSelectedElemProp("spriteID");
    const [color, setColor] = useSelectedElemProp("color");
    const selectedType = useSelectedElemType();
    const [isMoreOpen, setIsMoreOpen] = React.useState(false);

    const isConsole = selectedType !== undefined && getIsConsole(selectedType);

    const onUpload = React.useCallback((asset: MapAsset) => {
        setSpriteID(asset.id);
        setColor(undefined);
    }, [setSpriteID, setColor]);

    const onReset = React.useCallback(() => {
        setSpriteID(undefined);
        setColor(undefined);
    }, [setSpriteID, setColor]);

    if (!selectedType || TYPE_BLACKLIST.includes(selectedType))
        return null;

    return (
        <>
            <PanelContainer title={t("sprite.title") as string}>
                <ImageUpload
                    name={selectedType}
                    defaultSpriteURL={`/sprites/${selectedType}.png`}
                    assetID={spriteID}
                    onUpload={onUpload}
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
            </PanelContainer>
            <MapError
                info
                isVisible={selectedType?.startsWith("util-vent")}
                icon={<PlayArrow/>}
            >
                {t("sprite.ventInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={selectedType?.startsWith("sab-door")}
                icon={<PlayArrow/>}
            >
                {t("sprite.doorInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={selectedType === "util-cam"}
                icon={<PlayArrow/>}
            >
                {t("sprite.camInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={spriteID !== undefined && isConsole}
                icon={<Padding/>}
            >
                {t("sprite.paddingInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={selectedType === "util-filter"}
                icon={<Visibility/>}
            >
                {t("sprite.filterInfo") as string}
            </MapError>
        </>
    );
}
