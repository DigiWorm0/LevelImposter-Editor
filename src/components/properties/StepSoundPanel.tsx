import { Button, FormGroup, Menu, NumericInput } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import generateGUID from "../../hooks/generateGUID";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { PRESET_RESOURCE_IDS } from "../../types/au/AUElementDB";
import PanelContainer from "./PanelContainer";
import StepSoundEditorPanel from "./StepSoundEditorPanel";

const SoundPresetSelect = Select2.ofType<string>();

export default function StepSoundPanel() {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedSoundID, setSelectedSoundID] = React.useState<string | undefined>(undefined);

    const soundIDs = selectedElem?.properties.soundIDs || [];

    const editSound = (soundID: string) => {
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
                    setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, soundIDs: resourceIDs } });
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
                    value={soundIDs.length}
                    onValueChange={(value) => {
                        if (value < 0)
                            return;
                        for (let i = 0; i < value; i++) {
                            if (soundIDs[i] == null)
                                soundIDs[i] = generateGUID();
                        }
                        for (let i = soundIDs.length - 1; i >= value; i--) {
                            soundIDs.splice(i, 1);
                        }
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, soundIDs } });
                    }} />
            </FormGroup>

            <Menu>
                {selectedElem.properties.soundIDs?.map((soundID, index) => {
                    const isSelected = selectedSoundID === soundID;

                    return (
                        <div key={soundID + + "-" + index}>
                            <MenuItem2
                                icon="volume-up"
                                text={"Step Variant " + (index + 1)}
                                onClick={() => editSound(soundID)}
                                active={isSelected}
                            />

                            {isSelected && (
                                <StepSoundEditorPanel
                                    soundID={soundID}
                                    onClose={() => setSelectedSoundID(undefined)} />
                            )}
                        </div>
                    );
                })}
            </Menu>
        </PanelContainer>
    );
}
