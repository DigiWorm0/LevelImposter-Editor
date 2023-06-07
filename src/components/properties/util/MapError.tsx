import { Button, Callout, Collapse, IconName } from '@blueprintjs/core';
import React from 'react';
import { useSettingsValue } from '../../../hooks/jotai/useSettings';

export interface MapErrorProps {
    isVisible?: boolean,
    info?: boolean,
    icon?: IconName,
    children: React.ReactNode

    buttonText?: string,
    buttonIcon?: IconName,
    onButtonClick?: () => void
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
                <p>
                    {props.children}

                </p>

                {props.buttonText && props.onButtonClick && (
                    <Button
                        icon={props.buttonIcon}
                        onClick={props.onButtonClick}
                        intent={props.info ? "primary" : "warning"}
                        small
                    >
                        {props.buttonText}
                    </Button>
                )}
            </Callout>
        </Collapse>
    )
}
