import { Button, Card, H6 } from "@blueprintjs/core";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import useResource from "../../hooks/useResource";
import { DEFAULT_VOLUME } from "../../types/generic/Constants";
import DevInfo from "../DevInfo";
import AudioPlayer from "./AudioPlayer";

export default function StepSoundEditorPanel(props: { soundID: string, onClose: () => void }) {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [sound, setSound] = useResource(props.soundID);
    const saveHistory = useSaveHistory();

    const onDeleteClick = () => {
        if (!selectedElem)
            return;
        selectedElem.properties.soundIDs = selectedElem.properties.soundIDs?.filter(id => id !== props.soundID);
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                soundIDs: selectedElem.properties.soundIDs
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
                if (!selectedElem)
                    return;

                saveHistory();
                setSound(reader.result as string);
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
                {props.soundID}
            </DevInfo>

            <AudioPlayer
                audioData={sound}
                volume={selectedElem.properties.soundVolume === undefined ? DEFAULT_VOLUME : selectedElem.properties.soundVolume}
                onVolumeChange={(volume) => {
                    selectedElem.properties.soundVolume = volume;
                    setSelectedElem({ ...selectedElem });
                }} />


            <div style={{ marginTop: 10 }}>
                <Button
                    icon="cloud-upload"
                    intent="primary"
                    onClick={() => onUploadClick()}
                    style={{ marginRight: 5 }} />
                <Button
                    icon="tick"
                    intent="success"
                    onClick={() => props.onClose()}
                    style={{ marginRight: 5 }} />
                <Button
                    icon="trash"
                    intent="danger"
                    onClick={() => onDeleteClick()} />
            </div>
        </Card>
    )
}