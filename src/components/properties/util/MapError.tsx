import { Callout, IconName } from '@blueprintjs/core';
import React from 'react';

export interface MapErrorProps {
    isVisible?: boolean,
    info?: boolean,
    icon?: IconName,
    children: React.ReactNode
}

export default function MapError(props: MapErrorProps) {
    if (!props.isVisible)
        return null;

    return (
        <Callout
            intent={props.info ? "primary" : "warning"}
            icon={props.icon}
            style={{
                borderBottom: `3px solid ${props.info ? "rgb(37, 93, 128)" : "rgb(146, 100, 53)"}`,
                borderRadius: 0
            }}
        >
            {props.children}
        </Callout>
    )
}
