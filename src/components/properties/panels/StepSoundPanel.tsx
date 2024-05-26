import React from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_VOLUME } from "../../../types/generic/Constants";
import generateGUID from "../../../utils/generateGUID";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import SoundPresetSelect from "../input/select/SoundPresetSelect";
import DropdownList from "../util/DropdownList";
import PanelContainer from "../util/PanelContainer";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import FlexNumericInput from "../util/FlexNumericInput";

export default function StepSoundPanel() {
    const { t } = useTranslation();
    const isStepSound = useIsSelectedElemType("util-sound2");
    const [_sounds, setSounds] = useSelectedElemProp("sounds");
    const [selectedSoundID, setSelectedSoundID] = React.useState<string | undefined>(undefined);

    const sounds = _sounds ?? [];

    if (!isStepSound)
        return null;

    return (
        <>
            <PanelContainer title={t("stepSound.title") as string}>
                <ElementPropNumericInput
                    name={t("stepSound.priority")}
                    prop={"soundPriority"}
                    icon="PriorityHigh"
                    defaultValue={0}
                    min={0}
                    max={1000}
                    stepSize={10}
                />
                <SoundPresetSelect />
                <FlexNumericInput
                    value={sounds.length}
                    inputProps={{
                        label: t("stepSound.soundCount"),
                        fullWidth: true,
                        sx: { mt: 1, mb: 1 }
                    }}
                    onChange={(value) => {
                        // Expand the array
                        for (let i = 0; i < value; i++) {
                            if (!sounds[i]) {
                                sounds[i] = {
                                    id: generateGUID(),
                                    presetID: undefined,
                                    volume: DEFAULT_VOLUME,
                                    isPreset: false
                                };
                            }
                        }

                        // Shrink the array
                        sounds.splice(value, sounds.length - value);
                        setSounds([...sounds]);
                    }}
                    min={0}
                />

                <DropdownList
                    elements={sounds?.map((sound, index) => ({
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
