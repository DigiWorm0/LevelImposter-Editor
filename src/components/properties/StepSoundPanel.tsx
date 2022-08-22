import { Card, FormGroup, Menu, MenuItem, NumericInput } from "@blueprintjs/core";
import React from "react";
import generateGUID from "../../hooks/generateGUID";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import GUID, { MaybeGUID } from "../../types/generic/GUID";
import PanelContainer from "./PanelContainer";
import StepSoundEditorPanel from "./StepSoundEditorPanel";

export default function StepSoundPanel() {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedSoundID, setSelectedSoundID] = React.useState<MaybeGUID>(undefined);

    const soundIDs = selectedElem?.properties.soundIDs || [];

    const editSound = (soundID: GUID) => {
        if (soundID === selectedSoundID)
            setSelectedSoundID(undefined);
        else
            setSelectedSoundID(soundID);
    }

    if (!selectedElem
        || selectedElem.type !== "util-sound2")
        return null;

    return (
        <PanelContainer title="Step Sounds">
            <Menu>
                <FormGroup label="Step Variants">
                    <NumericInput
                        fill
                        min={1}
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

                {selectedElem.properties.soundIDs?.map((soundID, index) => {
                    const isSelected = selectedSoundID === soundID;

                    return (
                        <div key={soundID + + "-" + index}>
                            <MenuItem
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
