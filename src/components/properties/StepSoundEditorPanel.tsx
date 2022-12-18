import { Button, Card, H6 } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import useSelectedSound, { useSelectedSoundID } from "../../hooks/jotai/useSelectedSound";
import { DEFAULT_VOLUME } from "../../types/generic/Constants";
import DevInfo from "../DevInfo";
import AudioPlayer from "./AudioPlayer";

export default function StepSoundEditorPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const saveHistory = useSaveHistory();
    const [selectedSoundID, setSelectedSoundID] = useSelectedSoundID();
    const [selectedSound, setSelectedSound] = useSelectedSound();

    const onDeleteClick = () => {
        if (!selectedElem)
            return;
        const sounds = selectedElem.properties.sounds?.filter(sound => sound.id !== selectedSoundID);
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                sounds
            }
        });
    }

    const onUploadClick = () => {
        console.log("Showing Upload Dialog");
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "audio/wav";
        input.onchange = () => {
            console.log("Uploaded File");
            if (input.files === null)
                return;
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                console.log("Loaded File");
                if (!selectedSound)
                    return;

                saveHistory();
                setSelectedSound({
                    ...selectedSound,
                    data: reader.result as string,
                    volume: DEFAULT_VOLUME,
                    isPreset: false
                });
            }
            reader.readAsDataURL(file);
        }
        input.click();
    }

    if (!selectedElem)
        return null;

    return (
        <Card>
            <H6>Step Variant</H6>

            <DevInfo>
                {selectedSound?.id}
            </DevInfo>

            <AudioPlayer />

            <div style={{ marginTop: 10 }}>
                <Button
                    icon="cloud-upload"
                    intent="primary"
                    onClick={() => onUploadClick()}
                    style={{ marginRight: 5 }} />
                <Button
                    icon="tick"
                    intent="success"
                    onClick={() => setSelectedSoundID(undefined)}
                    style={{ marginRight: 5 }} />
                <Button
                    icon="trash"
                    intent="danger"
                    onClick={() => onDeleteClick()} />
            </div>
        </Card>
    )
}