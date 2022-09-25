import React from 'react';
import { Button, ButtonGroup, ControlGroup, FormGroup, Label, Switch } from "@blueprintjs/core";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useSpriteSrc } from "../../hooks/useSprite";
import useTranslation from "../../hooks/useTranslation";
import DevInfo from "../DevInfo";
import PanelContainer from "./PanelContainer";
import { AlphaPicker, Color, ColorResult, HuePicker, SketchPicker } from 'react-color';
import ColorPicker from '../ColorPicker';
import LIColor from '../../types/li/LIColor';

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
];

export default function SpritePanel() {
    const translation = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const spriteURL = useSpriteSrc(selectedElem?.id);
    const saveHistory = useSaveHistory();

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
                saveHistory();
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
        saveHistory();
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                spriteData: undefined
            }
        });
    }

    if (!selectedElem || TYPE_BLACKLIST.includes(selectedElem.type))
        return null;

    return (
        <PanelContainer title={translation.Sprite}>
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

            <ButtonGroup minimal fill>
                <Button
                    fill
                    icon="refresh"
                    text={translation.Reset}
                    onClick={onResetClick}
                />
                <Button
                    fill
                    icon="upload"
                    text={translation.Upload}
                    onClick={onUploadClick}
                />
            </ButtonGroup>
            <ControlGroup fill style={{ padding: 5, marginTop: 15 }}>
                <ColorPicker
                    title={"Color"}
                    color={selectedElem?.properties.color || { r: 255, g: 255, b: 255, a: 1 }}
                    onOpen={() => {
                        saveHistory();
                    }}
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
            {(selectedElem.type.startsWith("dec-") || selectedElem.type.startsWith("util-blank")) && (
                <Switch
                    key={selectedElem.id + "-noShadows"}
                    checked={selectedElem.properties.noShadows === undefined ? false : selectedElem.properties.noShadows}
                    label={translation.NoShadows}
                    style={{ textAlign: "center", marginTop: 10, marginBottom: 15 }}
                    onChange={(e) => {
                        saveHistory();
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, noShadows: e.currentTarget.checked } });
                    }}
                />
            )}
            {(selectedElem.properties.noShadows === true) && (
                <Switch
                    key={selectedElem.id + "-noShadowsBehaviour"}
                    checked={selectedElem.properties.noShadowsBehaviour === undefined ? false : selectedElem.properties.noShadowsBehaviour}
                    label={translation.NoShadowBehavior}
                    style={{ textAlign: "center", marginTop: 10, marginBottom: 15 }}
                    onChange={(e) => {
                        saveHistory();
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, noShadowsBehaviour: e.currentTarget.checked } });
                    }}
                />
            )}
        </PanelContainer>
    );
}
