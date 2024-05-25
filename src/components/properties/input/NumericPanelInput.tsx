import { FormGroup, InputAdornment, TextField, Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/elements/useSelectedElem";
import LIProperties from "../../../types/li/LIProperties";
import clamp from "../../../utils/clamp";
import MaterialIcon, { IconName } from "../../utils/MaterialIcon";

export interface NumericInputProps {
    name: string;
    prop: keyof LIProperties;
    defaultValue: number;

    icon?: IconName;
    label?: string;
    min?: number;
    max?: number;
    minorStepSize?: number; // TODO: Implement this
    stepSize?: number;
    majorStepSize?: number; // TODO: Implement this
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
}

export default function NumericPanelInput(props: NumericInputProps) {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const { t } = useTranslation();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const propValue = selectedElem?.properties[props.prop] !== undefined ? selectedElem.properties[props.prop] : props.defaultValue;

    React.useEffect(() => {
        if (inputRef.current)
            inputRef.current.value = (propValue as number).toString();
    }, [selectedElem?.id]);

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedElem) {
            const stringVal = e.target.value;
            const val = parseFloat(stringVal);
            const newVal = isNaN(val) ?
                props.defaultValue :
                clamp(val, props.min ?? -Infinity, props.max ?? Infinity);

            setSelectedElem({
                ...selectedElem,
                properties: {
                    ...selectedElem.properties,
                    [props.prop]: newVal
                }
            });
        }
    }, [selectedElem, props.prop, setSelectedElem, props.defaultValue, props.min, props.max]);

    return (
        <FormGroup
            style={{
                marginBottom: 5,
                marginTop: 5
            }}
        >
            <Tooltip title={t(props.name) as string}>
                <TextField
                    key={selectedElem?.id}
                    inputRef={inputRef}
                    fullWidth
                    placeholder={props.defaultValue.toString()}
                    defaultValue={propValue as number}
                    type={"number"}
                    size={"small"}
                    color={props.color ?? "primary"}
                    onChange={onChange}
                    InputProps={{
                        style: {
                            paddingLeft: 8,
                            paddingRight: 0
                        },
                        inputProps: {
                            min: props.min,
                            step: props.stepSize,
                            max: props.max
                        },
                        startAdornment: (
                            <InputAdornment position={"start"}>
                                {props.icon && (<MaterialIcon size={20} icon={props.icon} />)}
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position={"end"}>
                                {props.label}
                            </InputAdornment>
                        ),

                    }}
                />
            </Tooltip>
        </FormGroup>
    )
}