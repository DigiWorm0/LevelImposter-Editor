import { Callout, IconName } from '@blueprintjs/core';
import React from 'react';

export default function MapError(props: {
    isVisible?: boolean,
    info?: boolean,
    icon?: IconName,
    children: React.ReactNode
}) {
    if (!props.isVisible) return null;

    return (
        <Callout
            intent={props.info ? "primary" : "warning"}
            style={{
                borderBottom: `3px solid ${props.info ? "rgb(37, 93, 128)" : "rgb(146, 100, 53)"}`,
                borderRadius: 0
            }}
            icon={props.icon}
        >
            {props.children}
        </Callout>
    )
}
