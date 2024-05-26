import { useTranslation } from "react-i18next";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import DoorSelect from "../input/select/DoorSelect";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import { useSelectedElemPropValue } from "../../../hooks/elements/useSelectedElemProperty";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import useElementIDExists from "../../../hooks/elements/useElementIDExists";

export default function DecontaminationPanel() {
    const { t } = useTranslation();
    const isDecontamination = useIsSelectedElemType("util-decontamination");
    const doorIDA = useSelectedElemPropValue("doorA");
    const doorIDB = useSelectedElemPropValue("doorB");
    const doorExistsA = useElementIDExists(doorIDA);
    const doorExistsB = useElementIDExists(doorIDB);

    if (!isDecontamination)
        return null;
    return (
        <>
            <PanelContainer title={t("decontamination.title") as string}>
                <DoorSelect prop={"doorA"} />
                <DoorSelect prop={"doorB"} />
                <ElementPropNumericInput
                    name={t("decontamination.duration")}
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
            <MapError isVisible={!doorExistsA || !doorExistsB}>
                {t("decontamination.errorMissingDoor") as string}
            </MapError>
        </>
    );
}
