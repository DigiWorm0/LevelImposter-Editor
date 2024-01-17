import React from "react";
import { Classes, Icon, IconName, SwitchCard } from "@blueprintjs/core";
import LIMapProperties from "../../../types/li/LIMapProperties";
import { useMapProperties } from "../../../hooks/jotai/useMap";

export interface MapSwitchInputProps {
    name: string;
    prop?: keyof LIMapProperties;
    defaultValue: boolean;

    icon?: IconName;
}

export default function MapSwitchInput(props: MapSwitchInputProps) {
    const [properties, setProperties] = useMapProperties();

    const value = React.useMemo(() => {
        if (props.prop === undefined)
            return false;
        return (properties[props.prop] as boolean) ?? props.defaultValue;
    }, [properties, props.prop, props.defaultValue]);

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.prop === undefined)
            return;
        setProperties({
            ...properties,
            [props.prop]: e.target.checked
        });
    }, [properties, props.prop, setProperties]);

    return (
        <SwitchCard
            checked={value}
            showAsSelectedWhenChecked={false}
            onChange={onChange}
            compact
        >
            <Icon
                icon={props.icon}
                className={Classes.TEXT_MUTED}
                style={{ marginRight: 8 }}
            />
            {props.name}
        </SwitchCard>
    )
}