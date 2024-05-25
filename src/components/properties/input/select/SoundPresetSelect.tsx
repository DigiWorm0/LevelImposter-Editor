import { MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../../hooks/elements/useSelectedElem";
import { PRESET_RESOURCE_IDS } from "../../../../types/db/AUElementDB";
import { DEFAULT_VOLUME } from "../../../../types/generic/Constants";
import generateGUID from "../../../../utils/generateGUID";
import ResettablePanelInput from "../ResettablePanelInput";

export default function SoundPresetSelect() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    if (!selectedElem)
        return null;

    // TODO: Fix me!

    return (
        <ResettablePanelInput
            onReset={() => {
                setSelectedElem({
                    ...selectedElem, properties: {
                        ...selectedElem.properties, sounds: []
                    }
                });
            }}
        >
            <Select
                size={"small"}
                value={selectedElem.properties.sounds?.[0]?.presetID}
                onChange={(e) => {
                    const soundPreset = e.target.value;
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
                style={{
                    width: "100%"
                }}
            >
                {Object.keys(PRESET_RESOURCE_IDS).map((soundPreset) => (
                    <MenuItem
                        key={soundPreset}
                        value={soundPreset}
                    >
                        {t(`stepSound.${soundPreset}`) as string}
                    </MenuItem>
                ))}
            </Select>
        </ResettablePanelInput>
    )
}