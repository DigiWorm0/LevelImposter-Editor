import { Button, ButtonGroup } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import { useSpriteSrc } from "../../../hooks/useSprite";
import ColorPicker from "../../utils/ColorPicker";
import DevInfo from "../../utils/DevInfo";
import SizeTag from "../../utils/SizeTag";
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
    "util-dummy",
];

export default function SpritePanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const spriteURL = useSpriteSrc(selectedElem?.id);

    const onUploadClick = React.useCallback(() => {
        console.log("Showing Upload Dialog");
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = () => {
            console.log("Uploaded File");
            if (input.files === null)
                return;
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                console.log("Loaded File");
                if (!selectedElem)
                    return;
                setSelectedElem({
                    ...selectedElem,
                    properties: {
                        ...selectedElem.properties,
                        spriteData: reader.result as string
                    }
                });
            }
            reader.readAsDataURL(file);
        }
        input.click();
    }, [selectedElem, setSelectedElem]);

    const onResetClick = React.useCallback(() => {
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

    if (!selectedElem || TYPE_BLACKLIST.includes(selectedElem.type))
        return null;

    return (
        <>
            <PanelContainer title={t("sprite.title") as string}>
                <DevInfo>
                    {spriteURL.length}
                </DevInfo>

                <div style={{ textAlign: "center", padding: 15 }}>
                    <img
                        style={{ maxHeight: 100, maxWidth: 100 }}
                        src={spriteURL}
                        alt={selectedElem.name}
                    />
                </div>

                <div style={{ textAlign: "center", marginBottom: 10 }}>
                    <SizeTag
                        sizeBytes={spriteURL.length}
                        warningMsg={t("sprite.errorSize") as string}
                        okMsg={t("sprite.okSize") as string}
                    />
                </div>

                <ButtonGroup fill>
                    <Button
                        icon="cloud-upload"
                        intent="primary"
                        onClick={() => onUploadClick()}
                        style={{ margin: 3 }}
                    />
                    <ColorPicker
                        intent="success"
                        color={selectedElem.properties.color ?? { r: 255, g: 255, b: 255, a: 1 }}
                        style={{ margin: 3 }}
                        onChange={(color) => {
                            if (selectedElem) {
                                setSelectedElem({
                                    ...selectedElem,
                                    properties: {
                                        ...selectedElem.properties,
                                        color
                                    }
                                });
                            }
                        }}
                    />
                    <Button
                        icon="refresh"
                        intent="danger"
                        onClick={() => onResetClick()}
                        style={{ margin: 3 }}
                        disabled={selectedElem.properties.color === undefined && selectedElem.properties.spriteData === undefined}
                    />
                </ButtonGroup>
            </PanelContainer>
            <MapError info isVisible={selectedElem.type.startsWith("util-vent")} icon="play">
                {t("sprite.ventInfo") as string}
            </MapError>
            <MapError info isVisible={selectedElem.type.startsWith("sab-door")} icon="play">
                {t("sprite.doorInfo") as string}
            </MapError>
            <MapError info isVisible={selectedElem.type === "util-cam"} icon="play">
                {t("sprite.camInfo") as string}
            </MapError>
        </>
    );
}
