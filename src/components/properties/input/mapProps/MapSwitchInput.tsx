import React from "react";
import LIMapProperties from "../../../../types/li/LIMapProperties";
import { useMapProperties } from "../../../../hooks/map/useMap";
import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export interface MapSwitchInputProps {
    name: string;
    prop?: keyof LIMapProperties;
    defaultValue: boolean;

    icon?: React.ReactNode;
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

    const onClick = React.useCallback(() => {
        if (props.prop === undefined)
            return;
        setProperties({
            ...properties,
            [props.prop]: !value
        });
    }, [properties, props.prop, setProperties, value]);

    return (
        <ListItem
            dense
            disablePadding
            secondaryAction={
                <Checkbox
                    edge={"end"}
                    checked={value}
                    onChange={onChange}
                />
            }
        >
            <ListItemButton onClick={onClick}>
                {props.icon && <ListItemIcon>{props.icon}</ListItemIcon>}
                <ListItemText primary={props.name} />
            </ListItemButton>
        </ListItem>
    );
}