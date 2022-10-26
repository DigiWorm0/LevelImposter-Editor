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
                marginBottom: 10,
                borderRadius: 0
            }}
            icon={props.icon}
        >
            {props.children}
        </Callout>
    )
}
