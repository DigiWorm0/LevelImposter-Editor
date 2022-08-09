import { Button, ButtonGroup, Switch } from "@blueprintjs/core";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import useSprite from "../../hooks/useSprite";
import PanelContainer from "./PanelContainer";

export default function SpritePanel() {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const sprite = useSprite(selectedElem?.id);

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
        <PanelContainer title="Sprite">
            <div style={{ textAlign: "center", padding: 15 }}>
                <img
                    style={{ maxHeight: 100, maxWidth: 100 }}
                    src={sprite?.src}
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
            {(selectedElem.type.startsWith("dec-") || selectedElem.type === "util-blank") && (
                <Switch
                    key={selectedElem.id + "-noShadows"}
                    checked={selectedElem.properties.noShadows === undefined ? false : selectedElem.properties.noShadows}
                    label="No Shadows"
                    style={{ textAlign: "center", marginTop: 10, marginBottom: 15 }}
                    onChange={(e) => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, noShadows: e.currentTarget.checked } });
                    }}
                />
            )}
        </PanelContainer>
    );
}
