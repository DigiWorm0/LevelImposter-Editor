import { Button, ButtonGroup, ControlGroup } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useSpriteSrc } from "../../hooks/useSprite";
import LIColor from '../../types/li/LIColor';
import ColorPicker from '../ColorPicker';
import DevInfo from "../DevInfo";
import SizeTag from "../SizeTag";
import PanelContainer from "./PanelContainer";

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
    "util-dummy",
];

export default function SpritePanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const spriteURL = useSpriteSrc(selectedElem?.id);

    const onUploadClick = () => {
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
    }

    const onResetClick = () => {
        if (!selectedElem)
            return;
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                spriteData: undefined
            }
        });
    }

    const imgSize = spriteURL.length;

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
                        sizeBytes={imgSize}
                        warningMsg={t("sprite.errorSize") as string}
                        okMsg={t("sprite.okSize") as string}
                    />
                </div>

                <ButtonGroup minimal fill>
                    <Button
                        fill
                        icon="refresh"
                        text={t("sprite.reset") as string}
                        onClick={onResetClick}
                    />
                    <Button
                        fill
                        icon="upload"
                        text={t("sprite.upload") as string}
                        onClick={onUploadClick}
                    />
                </ButtonGroup>
                <ControlGroup fill style={{ padding: 5, marginTop: 5 }}>
                    <ColorPicker
                        fill
                        minimal
                        title={"Set Color"}
                        color={selectedElem?.properties.color || { r: 255, g: 255, b: 255, a: 1 }}
                        onChange={(color: LIColor) => {
                            if (!selectedElem)
                                return;
                            setSelectedElem({
                                ...selectedElem,
                                properties: {
                                    ...selectedElem.properties,
                                    color
                                }
                            });
                        }}
                    />
                </ControlGroup>
            </PanelContainer>
        </>
    );
}
