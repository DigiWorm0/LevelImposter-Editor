import React from "react";
import { Button, FormGroup, IconName, Intent, NumericInput } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import LIProperties from "../../../types/li/LIProperties";
import clamp from "../../../hooks/clamp";

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

    return (
        <FormGroup
            style={{
                marginBottom: 5,
                marginTop: 5
            }}
        >
            <Tooltip2
                content={t(props.name) as string}
                hoverOpenDelay={200}
                hoverCloseDelay={0}
                fill
            >
                <NumericInput
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
                    onValueChange={(val, stringVal) => {
                        if (selectedElem) {
                            setSelectedElem({
                                ...selectedElem,
                                properties: {
                                    ...selectedElem.properties,
                                    [props.prop]: isNaN(parseFloat(stringVal)) ? props.defaultValue : clamp(val, props.min ?? -Infinity, props.max ?? Infinity)
                                }
                            });
                        }
                    }}
                />
            </Tooltip2>
        </FormGroup>
    )
}