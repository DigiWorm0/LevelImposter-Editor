import {useTranslation} from "react-i18next";
import PanelContainer from "../util/PanelContainer";
import useIsSelectedElemType from "../../../hooks/elements/useSelectedElemIsType";
import ElementPropSwitch from "../input/elementProps/ElementPropSwitch";
import {MenuItem, Select} from "@mui/material";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";

const PRESET_BOOL_VALUES = [
    "isImposter",
    "isInMeeting",
    "isDead"
];

export default function ValuePanel() {
    const {t} = useTranslation();
    const isBoolValue = useIsSelectedElemType("util-valuebool");
    const isPresetBoolValue = useIsSelectedElemType("util-valueboolpreset");
    const [presetType, setPresetType] = useSelectedElemProp("valuePresetType");

    if (!isBoolValue && !isPresetBoolValue)
        return null;

    return (
        <PanelContainer title={t("value.title") as string}>
            {isBoolValue && (
                <ElementPropSwitch
                    name={t("value.defaultValue")}
                    defaultValue={false}
                    prop="defaultBoolValue"
                />
            )}

            {isPresetBoolValue && (
                <Select
                    variant={"outlined"}
                    size={"small"}
                    fullWidth
                    value={presetType ?? PRESET_BOOL_VALUES[0]}
                    onChange={(e) => {
                        setPresetType(e.target.value);
                    }}
                >
                    {PRESET_BOOL_VALUES?.map((presetType) => (
                        <MenuItem key={presetType} value={presetType}>
                            {t(`value.${presetType}`)}
                        </MenuItem>
                    ))}
                </Select>
            )}
        </PanelContainer>
    );
}
