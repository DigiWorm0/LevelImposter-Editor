import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import LIProperties from "../../../types/li/LIProperties";
import LIMinigameProps from "../../../types/li/LIMinigameProps";
import { Box, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import MaterialIcon, { IconName } from "../../utils/MaterialIcon";
import { Clear } from "@mui/icons-material";

export interface TextInputProps {
    name: string;
    prop?: keyof LIProperties;
    minigameProp?: keyof LIMinigameProps;

    defaultValue?: string;
    icon?: IconName;
}

export default function TextPanelInput(props: TextInputProps) {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const { t } = useTranslation();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const propValue = React.useMemo(() => {
        if (props.prop && selectedElem?.properties[props.prop]) {
            return selectedElem.properties[props.prop];
        } else if (props.minigameProp && selectedElem?.properties.minigameProps?.[props.minigameProp]) {
            return selectedElem.properties.minigameProps[props.minigameProp];
        } else {
            return props.defaultValue;
        }
    }, [selectedElem, props.prop, props.minigameProp, props.defaultValue]);

    React.useEffect(() => {
        if (inputRef.current)
            inputRef.current.value = (propValue ?? "") as string;
    }, [selectedElem?.id]);

    const onChange = React.useCallback((val?: string) => {
        if (props.prop && selectedElem) {
            setSelectedElem({
                ...selectedElem,
                properties: {
                    ...selectedElem.properties,
                    [props.prop]: val
                }
            });
        } else if (props.minigameProp && selectedElem) {
            setSelectedElem({
                ...selectedElem,
                properties: {
                    ...selectedElem.properties,
                    minigameProps: {
                        ...selectedElem.properties.minigameProps,
                        [props.minigameProp]: val
                    }
                }
            });
        }
    }, [selectedElem, props.prop, props.minigameProp, setSelectedElem]);

    return (
        <Box
            style={{
                marginBottom: 5,
                marginTop: 5
            }}
        >
            <Tooltip title={t(props.name) as string}>
                <TextField
                    inputRef={inputRef}
                    fullWidth
                    size={"small"}
                    placeholder={t(props.name)}
                    label={t(props.name)}
                    defaultValue={propValue as string}
                    onBlur={(e) => onChange(e.target.value)}
                    onChange={(e) => onChange(e.currentTarget.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position={"start"}>
                                {props.icon ? <MaterialIcon icon={props.icon} /> : null}
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position={"end"}>
                                <IconButton
                                    onClick={() => {
                                        onChange();
                                        if (inputRef.current)
                                            inputRef.current.value = "";
                                    }}
                                >
                                    <Clear />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </Tooltip>
        </Box>
    )
}