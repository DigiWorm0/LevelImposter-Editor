import { ControlGroup } from "@blueprintjs/core";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import LIColor from "../../../types/li/LIColor";
import LIProperties from "../../../types/li/LIProperties";
import ColorPicker from "../../utils/ColorPicker";

export interface ColorInputProps {
    name: string;
    prop: keyof LIProperties;
    defaultValue: LIColor;
}

export default function ColorPanelInput(props: ColorInputProps) {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const { t } = useTranslation();

    const defaultValue = selectedElem?.properties[props.prop] !== undefined ? selectedElem.properties[props.prop] : props.defaultValue;

    return (
        <ControlGroup
            fill
            style={{
                textAlign: "center",
            }}
        >
            <ColorPicker
                fill
                minimal
                title={t(props.name) as string}
                color={defaultValue as LIColor}
                onChange={(color: LIColor) => {
                    if (selectedElem) {
                        setSelectedElem({
                            ...selectedElem,
                            properties: {
                                ...selectedElem.properties,
                                [props.prop]: color
                            }
                        });
                    }
                }}
            />
        </ControlGroup>
    )
}