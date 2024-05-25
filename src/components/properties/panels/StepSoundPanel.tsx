import { TextField } from "@mui/material";
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
import LISound from "../../../types/li/LISound";

export default function StepSoundPanel() {
    const { t } = useTranslation();
    const isStepSound = useIsSelectedElemType("util-sound2");
    const [_sounds, setSounds] = useSelectedElemProp<LISound[]>("sounds");
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
                <TextField
                    fullWidth
                    label={t("stepSound.soundCount")}
                    value={sounds.length}
                    type={"number"}
                    onChange={(e) => {
                        const stringValue = e.target.value;
                        if (stringValue === "")
                            return;
                        const value = parseInt(stringValue);
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
                        for (let i = sounds.length - 1; i >= value; i--)
                            sounds.splice(i, 1);
                        setSounds([...sounds]);
                    }}
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
