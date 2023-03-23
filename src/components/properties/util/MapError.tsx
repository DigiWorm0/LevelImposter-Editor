import { Callout, Collapse, IconName } from '@blueprintjs/core';
import React from 'react';
import { useSettingsValue } from '../../../hooks/jotai/useSettings';

export interface MapErrorProps {
    isVisible?: boolean,
    info?: boolean,
    icon?: IconName,
    children: React.ReactNode
}

export default function MapError(props: MapErrorProps) {
    const settings = useSettingsValue();

    return (
        <Collapse isOpen={(props.isVisible ?? true) && ((settings.isInfoVisible ?? true) || !(props.info ?? false))}>
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
        </Collapse>
    )
}
