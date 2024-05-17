import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import LIProperties from "../../../types/li/LIProperties";
import LIMinigameProps from "../../../types/li/LIMinigameProps";
import { Box, FormControlLabel, Switch, Tooltip } from "@mui/material";

export interface SwitchInputProps {
    name: string;
    prop?: keyof LIProperties;
    minigameProp?: keyof LIMinigameProps;
    defaultValue: boolean;

    tooltip?: string;
    disabled?: boolean;
}

export default function SwitchPanelInput(props: SwitchInputProps) {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const { t } = useTranslation();

    const defaultValue = React.useMemo(() => {
        if (props.prop && selectedElem?.properties[props.prop] !== undefined) {
            return selectedElem.properties[props.prop];
        } else if (props.minigameProp && selectedElem?.properties.minigameProps?.[props.minigameProp] !== undefined) {
            return selectedElem.properties.minigameProps[props.minigameProp];
        } else {
            return props.defaultValue;
        }
    }, [selectedElem, props.prop, props.minigameProp, props.defaultValue]);

    const onChange = React.useCallback((checked: boolean) => {
        if (props.prop && selectedElem) {
            setSelectedElem({
                ...selectedElem,
                properties: {
                    ...selectedElem.properties,
                    [props.prop]: checked
                }
            });
        } else if (props.minigameProp && selectedElem) {
            setSelectedElem({
                ...selectedElem,
                properties: {
                    ...selectedElem.properties,
                    minigameProps: {
                        ...selectedElem.properties.minigameProps,
                        [props.minigameProp]: checked
                    }
                }
            });
        }
    }, [selectedElem, props.prop, props.minigameProp, setSelectedElem]);

    return (
        <Box sx={{ textAlign: "center" }}>
            <Tooltip title={props.tooltip && (t(props.tooltip) as string)}>
                <FormControlLabel
                    control={
                        <Switch
                            key={`${selectedElem?.id}-${props.prop}`}
                            checked={defaultValue as boolean}
                            onChange={(e) => onChange(e.currentTarget.checked)}
                            disabled={props.disabled}
                        />
                    }
                    label={t(props.name) as string}
                />
            </Tooltip>
        </Box>
    )
}