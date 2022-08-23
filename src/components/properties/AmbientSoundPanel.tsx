import { Button, ButtonGroup, FormGroup } from "@blueprintjs/core";
import { useID } from "../../hooks/generateGUID";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import useResource from "../../hooks/useResource";
import { DEFAULT_VOLUME } from "../../types/generic/Constants";
import DevInfo from "../DevInfo";
import AudioPlayer from "./AudioPlayer";
import PanelContainer from "./PanelContainer";

export default function AmbientSoundPanel() {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const saveHistory = useSaveHistory();
    const soundID = useID(selectedElem?.properties.soundID);
    const [sound, setSound] = useResource(soundID);

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
                setSelectedElem({
                    ...selectedElem,
                    properties: {
                        ...selectedElem.properties,
                        soundID
                    }
                });
                setSound(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
        input.click();
    }

    const onResetClick = () => {
        if (!selectedElem)
            return;
        saveHistory();
        setSound(undefined);
    }
    if (!selectedElem || selectedElem.type !== "util-sound1")
        return null;

    return (
        <PanelContainer title="Ambient Sound">
            <FormGroup>
                <DevInfo>
                    {soundID}
                </DevInfo>
                <DevInfo>
                    {sound?.length}
                </DevInfo>

                <AudioPlayer
                    audioData={sound}
                    volume={selectedElem?.properties.soundVolume ? selectedElem.properties.soundVolume : DEFAULT_VOLUME}
                    onVolumeChange={(value) => {
                        if (!selectedElem)
                            return;
                        saveHistory();
                        setSelectedElem({
                            ...selectedElem,
                            properties: {
                                ...selectedElem.properties,
                                soundVolume: value
                            }
                        }
                        );
                    }} />


                <ButtonGroup minimal fill style={{ marginTop: 10, marginBottom: 10 }}>
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
            </FormGroup>
        </PanelContainer>
    );
}
