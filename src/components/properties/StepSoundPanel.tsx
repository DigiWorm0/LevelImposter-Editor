import React from "react";
import { Button, FormGroup, Menu, NumericInput } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { useTranslation } from "react-i18next";
import generateGUID from "../../hooks/generateGUID";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useSelectedSoundID } from "../../hooks/jotai/useSelectedSound";
import { PRESET_RESOURCE_IDS } from "../../types/au/AUElementDB";
import { DEFAULT_VOLUME } from "../../types/generic/Constants";
import GUID from "../../types/generic/GUID";
import SizeTag from "../utils/SizeTag";
import PanelContainer from "./util/PanelContainer";
import SoundEditorPanel from "./SoundEditorPanel";

export default function StepSoundPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedSoundID, setSelectedSoundID] = useSelectedSoundID();

    const sounds = React.useMemo(() => selectedElem?.properties.sounds || [], [selectedElem]);

    const editSound = React.useCallback((soundID: GUID) => {
        if (soundID === selectedSoundID)
            setSelectedSoundID(undefined);
        else
            setSelectedSoundID(soundID);
    }, [selectedSoundID, setSelectedSoundID]);

    const soundPresetSelectRenderer: ItemRenderer<string> = (soundPreset, props) => (
        <MenuItem2
            key={soundPreset + props.index + "-soundPreset"}
            text={soundPreset}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    const soundSize = React.useMemo(() => {
        return selectedElem?.properties.sounds?.reduce((acc, cur) => acc + (cur.data?.length || 0), 0) || 0;
    }, [selectedElem]);

    if (!selectedElem
        || selectedElem.type !== "util-sound2")
        return null;

    return (
        <PanelContainer title={t("stepSound.title") as string}>

            <Select2
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
                    }} />
            </FormGroup>

            <div style={{ textAlign: "center", marginBottom: 5, marginTop: 10 }}>
                <SizeTag
                    sizeBytes={soundSize}
                    warningMsg={t("stepSound.errorSize") as string}
                    okMsg={t("stepSound.okSize") as string}
                />
            </div>

            <Menu>
                {selectedElem.properties.sounds?.map((sound, index) => {
                    const isSelected = sound.id === selectedSoundID;

                    return (
                        <div key={index}>
                            <MenuItem2
                                icon="volume-up"
                                text={t("stepSound.default", { index: index + 1 }) as string}
                                onClick={() => editSound(sound.id)}
                                active={isSelected}
                            />

                            {isSelected && (
                                <SoundEditorPanel
                                    title={t("stepSound.variant")}
                                />
                            )}
                        </div>
                    );
                })}
            </Menu>
        </PanelContainer>
    );
}
