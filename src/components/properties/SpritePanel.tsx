import { Button, ButtonGroup, ControlGroup, Icon, Switch, Tag } from "@blueprintjs/core";
import { Popover2, Tooltip2 } from "@blueprintjs/popover2";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useSpriteSrc } from "../../hooks/useSprite";
import useTranslation from "../../hooks/useTranslation";
import LIColor from '../../types/li/LIColor';
import ColorPicker from '../ColorPicker';
import DevInfo from "../DevInfo";
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

    const imgSize = spriteURL.length;
    const isOverSize = imgSize > 1000 * 1000;

    const getImgSizeString = () => {
        const imgSizeKB = imgSize / 1000;
        const imgSizeMB = imgSizeKB / 1000;

        if (imgSizeMB > 1)
            return `${imgSizeMB.toFixed(2)} MB`;
        else if (imgSizeKB > 1)
            return `${imgSizeKB.toFixed(2)} KB`;
        else
            return `${imgSize} Bytes`;
    }

    if (!selectedElem || TYPE_BLACKLIST.includes(selectedElem.type))
        return null;

    return (
        <>
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

                <div style={{ textAlign: "center", marginBottom: 10 }}>
                    <Tooltip2
                        content={isOverSize ? "Larger images can freeze or crash the game. Try downscaling or splitting your sprite into multiple objects." : "Your image is small enough to not cause any issues."}
                        position="top"
                        intent={isOverSize ? "danger" : "success"}
                    >
                        <Tag
                            minimal
                            large
                            intent={isOverSize ? "danger" : "success"}
                        >
                            {isOverSize && <Icon icon="warning-sign" style={{ marginRight: 5 }} />}
                            {getImgSizeString()}
                        </Tag>
                    </Tooltip2>
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
                <ControlGroup fill style={{ padding: 5, marginTop: 5 }}>
                    <ColorPicker
                        title={"Set Color"}
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
            </PanelContainer>
        </>
    );
}
