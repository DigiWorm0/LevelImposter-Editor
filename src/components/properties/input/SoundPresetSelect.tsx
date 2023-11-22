import { Button, FormGroup } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { useTranslation } from "react-i18next";
import generateGUID from "../../../hooks/utils/generateGUID";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import { PRESET_RESOURCE_IDS } from "../../../types/au/AUElementDB";
import { DEFAULT_VOLUME } from "../../../types/generic/Constants";
import ResettablePanelInput from "./ResettablePanelInput";

export default function SoundPresetSelect() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const selectRenderer: ItemRenderer<string> = (preset, props) => (
        <MenuItem2
            key={props.index + "-preset"}
            text={t(`stepSound.${preset}`) as string}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    if (!selectedElem)
        return null;

    return (
        <FormGroup
            style={{
                marginBottom: 5,
                marginTop: 5
            }}
        >
            <ResettablePanelInput
                onReset={() => {
                    setSelectedElem({
                        ...selectedElem, properties: {
                            ...selectedElem.properties, sounds: []
                        }
                    });
                }}
            >
                <Select2
                    fill
                    filterable={false}
                    items={Object.keys(PRESET_RESOURCE_IDS)}
                    itemRenderer={selectRenderer}
                    onItemSelect={(soundPreset) => {
                        const resourceIDs = PRESET_RESOURCE_IDS[soundPreset];
                        setSelectedElem({
                            ...selectedElem, properties: {
                                ...selectedElem.properties, sounds: resourceIDs.map((resourceID) => {
                                    return {
                                        id: generateGUID(),
                                        presetID: resourceID,
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
                        text={t(`stepSound.presets`) as string}
                        style={{
                            fontStyle: selectedElem.properties.taskLength ? "normal" : "italic"
                        }}
                        fill
                    />
                </Select2>
            </ResettablePanelInput>
        </FormGroup>
    )
}