import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/map/elements/useSelectedElem";
import PanelContainer from "../util/PanelContainer";
import React from "react";
import DoorSelect from "../input/DoorSelect";
import { useElementValue } from "../../../hooks/map/elements/useElements";
import MapError from "../util/MapError";
import NumericPanelInput from "../input/NumericPanelInput";
import SoundEditorPanel from "../editors/SoundEditorPanel";

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
