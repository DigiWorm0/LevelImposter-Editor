import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useTranslation} from "react-i18next";
import {PRESET_RESOURCE_IDS} from "../../../../types/db/AUElementDB";
import {DEFAULT_VOLUME} from "../../../../types/generic/Constants";
import generateGUID from "../../../../utils/strings/generateGUID";
import useSelectedElemProp, {useSetSelectedElemProp} from "../../../../hooks/elements/useSelectedElemProperty";
import React from "react";

export default function SoundPresetSelect() {
    const {t} = useTranslation();
    const setSounds = useSetSelectedElemProp("sounds");
    const [soundType, setSoundType] = useSelectedElemProp("soundPresetType");

    const onSelectChange = (e: SelectChangeEvent) => {
        // If the user selects custom, clear the sound type
        if (e.target.value === "custom") {
            setSoundType(undefined);
            return;
        }

        // Get the resource IDs for the selected preset
        const resourceIDs = PRESET_RESOURCE_IDS[e.target.value];
        if (!resourceIDs)
            return;

        // Set the sounds
        setSounds(resourceIDs.map(resourceID => ({
            id: generateGUID(),
            presetID: resourceID,
            presetType: e.target.value,
            volume: DEFAULT_VOLUME,
            isPreset: true
        })));

        // Set the sound type
        setSoundType(e.target.value);
    };

    console.log(soundType);

    return (
        <Select
            size={"small"}
            value={soundType ?? "custom"}
            variant={"outlined"}
            onChange={onSelectChange}
            sx={{width: "100%"}}
        >
            {Object.keys(PRESET_RESOURCE_IDS).map((soundPreset) => (
                <MenuItem
                    key={soundPreset}
                    value={soundPreset}
                >
                    {t(`stepSound.${soundPreset}`)}
                </MenuItem>
            ))}

            <MenuItem
                key={"custom"}
                value={"custom"}
            >
                {t("stepSound.custom")}
            </MenuItem>
        </Select>
    );
}