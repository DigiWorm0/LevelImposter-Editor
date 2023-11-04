import React from "react";
import { useTranslation } from "react-i18next";
import getIsConsole from "../../../hooks/utils/getIsConsole";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import LIColor from "../../../types/li/LIColor";
import ImageUpload from "../util/ImageUpload";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import SwitchPanelInput from "../input/SwitchPanelInput";
import MapAsset from "../../../types/li/MapAssetDB";

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
    "util-sabotages"
];

export default function SpritePanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const isConsole = React.useMemo(() => {
        return getIsConsole(selectedElem?.type || "");
    }, [selectedElem]);

    const isGIF = React.useMemo(() => {
        return selectedElem?.properties.spriteData?.startsWith("data:image/gif;base64,");
    }, [selectedElem]);
    const isCustomAnim = React.useMemo(() => {
        return selectedElem?.type.startsWith("sab-door") || selectedElem?.type.startsWith("util-vent");
    }, [selectedElem]);

    const onUpload = React.useCallback((asset: MapAsset) => {
        if (!selectedElem)
            return;
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                spriteID: asset.id,
                color: undefined
            }
        });
    }, [selectedElem, setSelectedElem]);

    const onReset = React.useCallback(() => {
        if (!selectedElem)
            return;
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                spriteData: undefined,
                color: undefined
            }
        });
    }, [selectedElem, setSelectedElem]);

    const onColorChange = React.useCallback((color: LIColor) => {
        if (!selectedElem)
            return;
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                color
            }
        });
    }, [selectedElem, setSelectedElem]);

    if (!selectedElem || TYPE_BLACKLIST.includes(selectedElem.type))
        return null;

    return (
        <>
            <PanelContainer title={t("sprite.title") as string}>
                <ImageUpload
                    name={selectedElem.name}
                    defaultSpriteURL={`/sprites/${selectedElem.type}.png`}
                    assetID={selectedElem.properties.spriteID}
                    onUpload={onUpload}
                    onReset={onReset}
                    color={selectedElem.properties.color}
                    onColorChange={onColorChange}
                />
                {isGIF && (
                    <SwitchPanelInput
                        name="sprite.loop"
                        prop="loopGIF"
                        defaultValue={!isCustomAnim}
                        disabled={isCustomAnim}
                    />
                )}
            </PanelContainer>
            <MapError
                info
                isVisible={selectedElem.type.startsWith("util-vent")}
                icon="play"
            >
                {t("sprite.ventInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={selectedElem.type.startsWith("sab-door")}
                icon="play"
            >
                {t("sprite.doorInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={selectedElem.type === "util-cam"}
                icon="play"
            >
                {t("sprite.camInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={selectedElem.properties.spriteData !== undefined && isConsole}
                icon="vertical-inbetween"
            >
                {t("sprite.paddingInfo") as string}
            </MapError>
        </>
    );
}
