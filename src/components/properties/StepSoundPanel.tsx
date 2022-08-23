import { Button, FormGroup, Menu, NumericInput } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import generateGUID from "../../hooks/generateGUID";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import useSelectedSound, { useSelectedSoundID } from "../../hooks/jotai/useSelectedSound";
import { PRESET_RESOURCE_IDS } from "../../types/au/AUElementDB";
import { DEFAULT_VOLUME } from "../../types/generic/Constants";
import GUID, { MaybeGUID } from "../../types/generic/GUID";
import PanelContainer from "./PanelContainer";
import StepSoundEditorPanel from "./StepSoundEditorPanel";

const SoundPresetSelect = Select2.ofType<string>();

export default function StepSoundPanel() {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedSoundID, setSelectedSoundID] = useSelectedSoundID();

    const sounds = selectedElem?.properties.sounds || [];

    const editSound = (soundID: GUID) => {
        if (soundID === selectedSoundID)
            setSelectedSoundID(undefined);
        else
            setSelectedSoundID(soundID);
    }

    const soundPresetSelectRenderer: ItemRenderer<string> = (soundPreset, props) => (
        <MenuItem2
            key={soundPreset + props.index + "-soundPreset"}
            text={soundPreset}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    if (!selectedElem
        || selectedElem.type !== "util-sound2")
        return null;

    return (
        <PanelContainer title="Step Sounds">

            <SoundPresetSelect
                fill
                filterable={false}
                items={Object.keys(PRESET_RESOURCE_IDS)}
                itemRenderer={soundPresetSelectRenderer}
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
                }}>

                <Button
                    rightIcon="caret-down"
                    text={"Sound Presets"}
                    fill
                />
            </SoundPresetSelect>
            <FormGroup label="Priority" style={{ marginTop: 10 }}>
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
            <FormGroup label="Step Variants" style={{ marginTop: 5 }}>
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
                    }} />
            </FormGroup>

            <Menu>
                {selectedElem.properties.sounds?.map((sound, index) => {
                    const isSelected = sound.id === selectedSoundID;

                    return (
                        <div key={index}>
                            <MenuItem2
                                icon="volume-up"
                                text={"Step Variant " + (index + 1)}
                                onClick={() => editSound(sound.id)}
                                active={isSelected}
                            />

                            {isSelected && (
                                <StepSoundEditorPanel />
                            )}
                        </div>
                    );
                })}
            </Menu>
        </PanelContainer>
    );
}
