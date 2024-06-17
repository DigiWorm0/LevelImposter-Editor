import { MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PRESET_RESOURCE_IDS } from "../../../../types/db/AUElementDB";
import { DEFAULT_VOLUME } from "../../../../types/generic/Constants";
import generateGUID from "../../../../utils/strings/generateGUID";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";

export default function SoundPresetSelect() {
    const { t } = useTranslation();
    const [sounds, setSounds] = useSelectedElemProp("sounds");

    return (
        <Select
            size={"small"}
            value={sounds?.[0]?.presetID}
            onChange={(e) => {
                const resourceIDs = PRESET_RESOURCE_IDS[e.target.value];

                setSounds(resourceIDs.map(resourceID => ({
                    id: generateGUID(),
                    presetID: resourceID,
                    volume: DEFAULT_VOLUME,
                    isPreset: true
                })));
            }}
            sx={{ width: "100%" }}
        >
            {Object.keys(PRESET_RESOURCE_IDS).map((soundPreset) => (
                <MenuItem
                    key={soundPreset}
                    value={soundPreset}
                >
                    {t(`stepSound.${soundPreset}`)}
                </MenuItem>
            ))}
        </Select>
    );
}