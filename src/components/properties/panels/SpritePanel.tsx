import React from "react";
import { useTranslation } from "react-i18next";
import getIsConsole from "../../../hooks/getIsConsole";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import LIColor from "../../../types/li/LIColor";
import ImageUpload from "../util/ImageUpload";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";

const TYPE_BLACKLIST = [
    "util-player",
    "util-room",
    "util-spawn1",
    "util-spawn2",
    "util-sound1",
    "util-sound2",
    "util-tele",
    "util-layer",
    "util-triggerarea",
    "util-triggerrepeat",
    "util-triggersound",
    "util-triggerrand",
    "util-triggertimer",
    "util-triggerstart",
    "util-dummy",
];

export default function SpritePanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const isConsole = React.useMemo(() => {
        return getIsConsole(selectedElem?.type || "");
    }, [selectedElem]);

    const onUpload = React.useCallback((spriteURL: string) => {
        if (!selectedElem)
            return;
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                spriteData: spriteURL,
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
                    defaultSpriteURL={"/sprites/" + selectedElem.type + ".png"}
                    spriteURL={selectedElem.properties.spriteData}
                    onUpload={onUpload}
                    onReset={onReset}
                    color={selectedElem.properties.color}
                    onColorChange={onColorChange}
                />
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
