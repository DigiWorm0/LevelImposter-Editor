import { ControlGroup } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import LIColor from "../../../types/li/LIColor";
import LIMinigameProps from "../../../types/li/LIMinigameProps";
import LIProperties from "../../../types/li/LIProperties";
import ColorPicker from "../../utils/ColorPicker";

export interface ColorInputProps {
    name: string;
    prop?: keyof LIProperties;
    minigameProp?: keyof LIMinigameProps;
    defaultValue: LIColor;
    disableAlpha?: boolean;
}

export default function ColorPanelInput(props: ColorInputProps) {
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const defaultValue = React.useMemo(() => {
        if (props.prop && selectedElem?.properties[props.prop]) {
            return selectedElem.properties[props.prop];
        } else if (props.minigameProp && selectedElem?.properties.minigameProps?.[props.minigameProp]) {
            return selectedElem.properties.minigameProps[props.minigameProp];
        } else {
            return props.defaultValue;
        }
    }, [selectedElem, props.prop, props.minigameProp, props.defaultValue]);

    const onChange = React.useCallback((color: LIColor) => {
        if (props.prop && selectedElem) {
            setSelectedElem({
                ...selectedElem,
                properties: {
                    ...selectedElem.properties,
                    [props.prop]: color
                }
            });
        } else if (props.minigameProp && selectedElem) {
            setSelectedElem({
                ...selectedElem,
                properties: {
                    ...selectedElem.properties,
                    minigameProps: {
                        ...selectedElem.properties.minigameProps,
                        [props.minigameProp]: color
                    }
                }
            });
        }
    }, [selectedElem, props.prop, props.minigameProp, setSelectedElem]);

    return (
        <ControlGroup
            style={{
                textAlign: "center",
            }}
        >
            <ColorPicker
                fill
                minimal
                title={props.name}
                color={defaultValue as LIColor}
                onChange={onChange}
                disableAlpha={props.disableAlpha}
            />
        </ControlGroup>
    )
}