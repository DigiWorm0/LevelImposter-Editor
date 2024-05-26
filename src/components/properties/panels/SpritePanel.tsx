import React from "react";
import { useTranslation } from "react-i18next";
import { useMapAssetValue } from "../../../hooks/assets/useMapAsset";
import LIColor from "../../../types/li/LIColor";
import MapAsset from "../../../types/li/MapAsset";
import getIsConsole from "../../../utils/getIsConsole";
import ImageUpload from "../util/ImageUpload";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import ElementPropSwitch from "../input/elementProps/ElementPropSwitch";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import { MaybeGUID } from "../../../types/generic/GUID";
import useSelectedElemType from "../../../hooks/elements/useSelectedElemType";

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
    "util-dummy",
    "util-display",
    "util-onewaycollider",
    "util-decontamination",
    "util-sabotages",
    "util-binocularscollider",
    "util-ghostcollider",
];

export default function SpritePanel() {
    const { t } = useTranslation();
    const [spriteID, setSpriteID] = useSelectedElemProp<MaybeGUID>("spriteID");
    const [color, setColor] = useSelectedElemProp<LIColor | undefined>("color");
    const selectedType = useSelectedElemType();
    const asset = useMapAssetValue(spriteID);

    const isConsole = selectedType !== undefined && getIsConsole(selectedType);
    const isGIF = asset?.blob.type === "image/gif";
    const isCustomAnim = selectedType?.startsWith("sab-door") || selectedType?.startsWith("util-vent");

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
                {isGIF && (
                    <ElementPropSwitch
                        name={t("sprite.loop")}
                        prop="loopGIF"
                        defaultValue={!isCustomAnim}
                        disabled={isCustomAnim}
                    />
                )}
            </PanelContainer>
            <MapError
                info
                isVisible={selectedType?.startsWith("util-vent")}
                icon="PlayArrow"
            >
                {t("sprite.ventInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={selectedType?.startsWith("sab-door")}
                icon="PlayArrow"
            >
                {t("sprite.doorInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={selectedType === "util-cam"}
                icon="PlayArrow"
            >
                {t("sprite.camInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={spriteID !== undefined && isConsole}
                icon="Padding"
            >
                {t("sprite.paddingInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={selectedType === "util-filter"}
                icon="Visibility"
            >
                {t("sprite.filterInfo") as string}
            </MapError>
        </>
    );
}
