import { Button, ButtonGroup, Divider, H5 } from "@blueprintjs/core";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";

const URL_PREFIX = "/sprites/";
const URL_SUFFIX = ".png";

export default function SpritePanel() {
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const defaultURL = URL_PREFIX + selectedElem?.type + URL_SUFFIX;

    const onUploadClick = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = () => {
            if (input.files === null)
                return;
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
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

    if (!selectedElem
        || selectedElem.type === "util-player"
        || selectedElem.type === "util-room"
        || selectedElem.type === "util-spawn1"
        || selectedElem.type === "util-spawn2")

        return null;

    return (
        <div className="sprite-panel">
            <H5 style={{ marginTop: 25 }}>Sprite</H5>
            <Divider />
            <div style={{ textAlign: "center", margin: 15 }}>
                <img
                    style={{ maxHeight: 100, maxWidth: 100 }}
                    src={selectedElem.properties.spriteData ? selectedElem.properties.spriteData : defaultURL}
                    alt={selectedElem.name}
                />

            </div>

            <ButtonGroup minimal fill>
                <Button
                    fill
                    icon="refresh"
                    text="Reset"
                    onClick={onResetClick}
                />
                <Button
                    fill
                    icon="upload"
                    text="Upload"
                    onClick={onUploadClick}
                />
            </ButtonGroup>
        </div>
    );
}
