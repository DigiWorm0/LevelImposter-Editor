import { ControlGroup, Switch } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import LIProperties from "../../../types/li/LIProperties";

export interface SwitchInputProps {
    name: string;
    prop: keyof LIProperties;
    defaultValue: boolean;

    tooltip?: string;
    disabled?: boolean;
}

export default function SwitchPanelInput(props: SwitchInputProps) {
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

            <Tooltip2
                content={props.tooltip && (t(props.tooltip) as string)}
                placement="top"
                hoverOpenDelay={200}
                hoverCloseDelay={0}
            >
                <Switch
                    key={`${selectedElem?.id}-${props.prop}`}
                    checked={defaultValue as boolean}
                    label={t(props.name) as string}
                    disabled={props.disabled}
                    style={{
                        marginBottom: 5,
                        marginTop: 5
                    }}
                    onChange={(e) => {
                        if (selectedElem) {
                            setSelectedElem({
                                ...selectedElem,
                                properties: {
                                    ...selectedElem.properties,
                                    [props.prop]: e.currentTarget.checked
                                }
                            });
                        }
                    }}
                />
            </Tooltip2>
        </ControlGroup>
    )
}