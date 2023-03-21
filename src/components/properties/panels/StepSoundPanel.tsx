import { Button, FormGroup, NumericInput } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import { useTranslation } from "react-i18next";
import generateGUID from "../../../hooks/generateGUID";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import { PRESET_RESOURCE_IDS } from "../../../types/au/AUElementDB";
import { DEFAULT_VOLUME } from "../../../types/generic/Constants";
import SoundEditorPanel from "../editors/SoundEditorPanel";
import DropdownList from "../util/DropdownList";
import PanelContainer from "../util/PanelContainer";

export default function StepSoundPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedSoundID, setSelectedSoundID] = React.useState<string | undefined>(undefined);

    const sounds = React.useMemo(() => selectedElem?.properties.sounds || [], [selectedElem]);

    const presetRenderer: ItemRenderer<string> = (soundPreset, props) => (
        <MenuItem2
            key={soundPreset + props.index + "-soundPreset"}
            text={soundPreset}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    if (!selectedElem || selectedElem.type !== "util-sound2")
        return null;

    return (
        <PanelContainer title={t("stepSound.title") as string}>

            <Select2
                fill
                filterable={false}
                items={Object.keys(PRESET_RESOURCE_IDS)}
                itemRenderer={presetRenderer}
                onItemSelect={(soundPreset) => {
                    const resourceIDs = PRESET_RESOURCE_IDS[soundPreset];
                    setSelectedElem({
                        ...selectedElem, properties: {
                            ...selectedElem.properties, sounds: resourceIDs.map((resourceID) => {
                                return {
                                    id: generateGUID(),
                                    data: resourceID,
                                    volume: DEFAULT_VOLUME,
                                    isPreset: true
                                }
                            })
                        }
                    });
                }}
            >
                <Button
                    rightIcon="caret-down"
                    text={t("stepSound.presets") as string}
                    fill
                />
            </Select2>
            <FormGroup label={t("stepSound.priority")} style={{ marginTop: 10 }}>
                <NumericInput
                    fill
                    minorStepSize={1}
                    stepSize={10}
                    majorStepSize={100}
                    step={1}
                    value={selectedElem?.properties.soundPriority === undefined ? 0 : selectedElem.properties.soundPriority}
                    onValueChange={(value) => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, soundPriority: value } });
                    }} />
            </FormGroup>
            <FormGroup label={t("stepSound.variants")} style={{ marginTop: 5 }}>
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
                                    data: undefined,
                                    volume: DEFAULT_VOLUME,
                                    isPreset: false
                                };
                        }
                        for (let i = sounds.length - 1; i >= value; i--) {
                            sounds.splice(i, 1);
                        }
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, sounds: sounds } });
                    }}
                />
            </FormGroup>

            <DropdownList
                elements={selectedElem.properties.sounds?.map((sound, index) => ({
                    id: sound.id,
                    name: t("stepSound.default", { index: index + 1 }) as string,
                    icon: "volume-up"
                })) ?? []}
                selectedID={selectedSoundID}
                onSelectID={setSelectedSoundID}
                renderElement={(e) => (
                    <SoundEditorPanel
                        title={e.name}
                        soundID={e.id}
                        onFinish={() => setSelectedSoundID(undefined)}
                    />
                )}
            />
        </PanelContainer>
    );
}
