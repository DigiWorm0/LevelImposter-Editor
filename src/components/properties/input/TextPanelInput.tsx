import { FormGroup, IconName, InputGroup } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import LIProperties from "../../../types/li/LIProperties";
import ResettablePanelInput from "./ResettablePanelInput";

export interface TextInputProps {
    name: string;
    prop: keyof LIProperties;

    defaultValue?: string;
    icon?: IconName;
}

export default function TextPanelInput(props: TextInputProps) {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const { t } = useTranslation();
    const input = React.useRef<HTMLInputElement>(null);

    const defaultValue = selectedElem?.properties[props.prop] !== undefined ? selectedElem.properties[props.prop] : props.defaultValue;

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
                <ResettablePanelInput
                    onReset={() => {
                        if (selectedElem) {
                            setSelectedElem({
                                ...selectedElem,
                                properties: {
                                    ...selectedElem.properties,
                                    [props.prop]: props.defaultValue
                                }
                            });
                            if (input.current)
                                input.current.value = "";
                        }
                    }}
                >
                    <InputGroup
                        inputRef={input}
                        key={`${selectedElem?.id}-${props.prop}`}
                        fill
                        placeholder={t(props.name) as string}
                        defaultValue={defaultValue as string}
                        leftIcon={props.icon}
                        onBlur={(e) => {
                            const val = e.currentTarget.value;
                            if (selectedElem) {
                                setSelectedElem({
                                    ...selectedElem,
                                    properties: {
                                        ...selectedElem.properties,
                                        [props.prop]: val === "" ? props.defaultValue : val
                                    }
                                });
                            }
                        }}
                    />
                </ResettablePanelInput>
            </Tooltip2>
        </FormGroup>
    )
}