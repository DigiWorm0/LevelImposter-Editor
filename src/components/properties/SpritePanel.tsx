import { Button, ButtonGroup, Divider, H5 } from "@blueprintjs/core";
import useElement from "../../hooks/useElement";
import useSelected from "../../hooks/useSelected";

const URL_PREFIX = "/sprites/";
const URL_SUFFIX = ".png";

export default function SpritePanel() {
    const [selectedID, setSelectedID] = useSelected();
    const [element, setElement] = useElement(selectedID);

    const defaultURL = URL_PREFIX + element.type + URL_SUFFIX;

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
                setElement({
                    ...element,
                    properties: {
                        ...element.properties,
                        spriteData: reader.result as string
                    }
                });
            }
            reader.readAsDataURL(file);
        }
        input.click();
    }

    const onResetClick = () => {
        setElement({
            ...element,
            properties: {
                ...element.properties,
                spriteData: undefined
            }
        });
    }

    if (selectedID === ""
        || element.type === "util-player"
        || element.type === "util-room"
        || element.type === "util-spawn1"
        || element.type === "util-spawn2")

        return null;

    return (
        <div className="sprite-panel">
            <H5 style={{ marginTop: 25 }}>Sprite</H5>
            <Divider />
            <div style={{ textAlign: "center", margin: 15 }}>
                <img
                    style={{ maxHeight: 100, maxWidth: 100 }}
                    src={element.properties.spriteData ? element.properties.spriteData : defaultURL}
                    alt={element.name}
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
