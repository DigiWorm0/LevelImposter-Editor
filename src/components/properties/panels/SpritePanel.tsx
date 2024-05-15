import React from "react";
import { useTranslation } from "react-i18next";
import getIsConsole from "../../../utils/getIsConsole";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import LIColor from "../../../types/li/LIColor";
import ImageUpload from "../util/ImageUpload";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import SwitchPanelInput from "../input/SwitchPanelInput";
import MapAsset from "../../../types/li/MapAssetDB";
import { useMapAssetValue } from "../../../hooks/map/useMapAssets";

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
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const asset = useMapAssetValue(selectedElem?.properties.spriteID);

    const isConsole = React.useMemo(() => {
        return getIsConsole(selectedElem?.type || "");
    }, [selectedElem]);

    const isGIF = React.useMemo(() => {
        return asset?.blob.type === "image/gif";
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
                spriteID: undefined,
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
                icon="PlayArrow"
            >
                {t("sprite.ventInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={selectedElem.type.startsWith("sab-door")}
                icon="PlayArrow"
            >
                {t("sprite.doorInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={selectedElem.type === "util-cam"}
                icon="PlayArrow"
            >
                {t("sprite.camInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={selectedElem.properties.spriteID !== undefined && isConsole}
                icon="Padding"
            >
                {t("sprite.paddingInfo") as string}
            </MapError>
            <MapError
                info
                isVisible={selectedElem.type === "util-filter"}
                icon="Visibility"
            >
                {t("sprite.filterInfo") as string}
            </MapError>
        </>
    );
}
