import React from "react";
import { Button, FormGroup, IconName, Intent, NumericInput, Tooltip } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import LIProperties from "../../../types/li/LIProperties";
import clamp from "../../../utils/clamp";

export interface NumericInputProps {
    name: string;
    prop: keyof LIProperties;
    defaultValue: number;

    icon?: IconName;
    label?: string;
    min?: number;
    max?: number;
    minorStepSize?: number;
    stepSize?: number;
    majorStepSize?: number;
    intent?: Intent;
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

    const onValueChange = React.useCallback((val: number, stringVal: string) => {
        if (selectedElem) {
            setSelectedElem({
                ...selectedElem,
                properties: {
                    ...selectedElem.properties,
                    [props.prop]: isNaN(parseFloat(stringVal)) ? props.defaultValue : clamp(val, props.min ?? -Infinity, props.max ?? Infinity)
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
            <Tooltip
                content={t(props.name) as string}
                hoverOpenDelay={200}
                hoverCloseDelay={0}
                fill
            >
                <NumericInput
                    key={selectedElem?.id}
                    inputRef={inputRef}
                    fill
                    placeholder={props.defaultValue.toString()}
                    defaultValue={propValue as number}
                    min={props.min}
                    minorStepSize={props.minorStepSize}
                    stepSize={props.stepSize}
                    majorStepSize={props.majorStepSize}
                    leftIcon={props.icon}
                    rightElement={props.label ? (<Button minimal disabled>{props.label}</Button>) : undefined}
                    intent={props.intent}
                    onValueChange={onValueChange}
                />
            </Tooltip>
        </FormGroup>
    )
}