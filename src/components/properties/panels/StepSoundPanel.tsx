import { FormGroup, NumericInput } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import generateGUID from "../../../utils/generateGUID";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import { DEFAULT_VOLUME } from "../../../types/generic/Constants";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import NumericPanelInput from "../input/NumericPanelInput";
import SoundPresetSelect from "../input/SoundPresetSelect";
import DropdownList from "../util/DropdownList";
import PanelContainer from "../util/PanelContainer";

export default function StepSoundPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedSoundID, setSelectedSoundID] = React.useState<string | undefined>(undefined);

    const sounds = React.useMemo(() => selectedElem?.properties.sounds || [], [selectedElem]);

    if (!selectedElem || selectedElem.type !== "util-sound2")
        return null;

    return (
        <>
            <PanelContainer title={t("stepSound.title") as string}>
                <NumericPanelInput
                    name={t("stepSound.priority")}
                    prop={"soundPriority"}
                    icon="PriorityHigh"
                    defaultValue={0}
                    min={0}
                    max={1000}
                    minorStepSize={1}
                    stepSize={10}
                    majorStepSize={100}
                />
                <FormGroup label={t("stepSound.variants")} style={{ marginTop: 10 }}>
                    <SoundPresetSelect />
                    <NumericInput
                        fill
                        min={0}
                        value={sounds.length}
                        onValueChange={(value) => {
                            if (value < 0)
                                return;
                            for (let i = 0; i < value; i++) {
                                if (sounds[i] == null)
                                    sounds[i] = {
                                        id: generateGUID(),
                                        presetID: undefined,
                                        volume: DEFAULT_VOLUME,
                                        isPreset: false
                                    };
                            }
                            for (let i = sounds.length - 1; i >= value; i--) {
                                sounds.splice(i, 1);
                            }
                            setSelectedElem({
                                ...selectedElem,
                                properties: { ...selectedElem.properties, sounds: sounds }
                            });
                        }}
                    />
                </FormGroup>

                <DropdownList
                    elements={selectedElem.properties.sounds?.map((sound, index) => ({
                        id: sound.id,
                        name: t("stepSound.default", { index: index + 1 }) as string,
                        icon: "VolumeUp"
                    })) ?? []}
                    selectedID={selectedSoundID}
                    onSelectID={setSelectedSoundID}
                    renderElement={(e) => (
                        <SoundEditorPanel
                            title={e.name}
                            soundID={e.id}
                            onFinish={() => setSelectedSoundID(undefined)}
                            loop
                        />
                    )}
                />
            </PanelContainer>
        </>
    );
}
