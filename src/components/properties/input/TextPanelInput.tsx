import { FormGroup, IconName, InputGroup } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import LIProperties from "../../../types/li/LIProperties";
import ResettablePanelInput from "./ResettablePanelInput";
import LIMinigameProps from "../../../types/li/LIMinigameProps";

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
                        onChange();
                        if (inputRef.current)
                            inputRef.current.value = "";
                    }}
                >
                    <InputGroup
                        inputRef={inputRef}
                        fill
                        placeholder={t(props.name) as string}
                        defaultValue={propValue as string}
                        leftIcon={props.icon}
                        onBlur={(e) => {
                            onChange(e.target.value);
                        }}
                        onChange={(e) => {
                            onChange(e.currentTarget.value);
                        }}
                    />
                </ResettablePanelInput>
            </Tooltip2>
        </FormGroup>
    )
}