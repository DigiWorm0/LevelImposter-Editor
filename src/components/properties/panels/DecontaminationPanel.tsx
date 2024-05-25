import { useTranslation } from "react-i18next";
import { useElementValue } from "../../../hooks/elements/useElements";
import { useSelectedElemValue } from "../../../hooks/elements/useSelectedElem";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import DoorSelect from "../input/DoorSelect";
import NumericPanelInput from "../input/NumericPanelInput";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";

export default function DecontaminationPanel() {
    const { t } = useTranslation();
    const selectedElem = useSelectedElemValue();
    const doorA = useElementValue(selectedElem?.properties.doorA);
    const doorB = useElementValue(selectedElem?.properties.doorB);

    if (!selectedElem || selectedElem.type !== "util-decontamination")
        return null;

    return (
        <>
            <PanelContainer title={t("decontamination.title") as string}>
                <DoorSelect prop={"doorA"} />
                <DoorSelect prop={"doorB"} />
                <NumericPanelInput
                    name={"decontamination.duration"}
                    prop={"deconDuration"}
                    label={"seconds"}
                    defaultValue={3}
                    min={0}
                    icon={"Timer"}
                />
                <SoundEditorPanel
                    title={t("decontamination.sound") as string}
                    soundType="decontamSound"
                    defaultSoundURL="decontamSound.wav"
                />
            </PanelContainer>
            <MapError isVisible={doorA === undefined || doorB === undefined}>
                {t("decontamination.errorMissingDoor") as string}
            </MapError>
        </>
    );
}
