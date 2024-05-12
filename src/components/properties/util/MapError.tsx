import { Button, Callout, Collapse, IconName } from '@blueprintjs/core';
import React from 'react';
import { useSettingsValue } from '../../../hooks/useSettings';

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
    const { isInfoVisible } = useSettingsValue();

    const isVisible = (props.isVisible ?? true) &&
        (isInfoVisible || !(props.info ?? false));

    return (
        <Collapse isOpen={isVisible}>
            <Callout
                intent={props.info ? "primary" : "warning"}
                icon={props.icon}
                style={{
                    borderBottom: `3px solid ${props.info ? "rgb(37, 93, 128)" : "rgb(146, 100, 53)"}`,
                    borderRadius: 0
                }}
            >
                <p style={{ marginBottom: 0 }}>
                    {props.children}
                </p>

                {props.buttonText && props.onButtonClick && (
                    <Button
                        icon={props.buttonIcon}
                        onClick={props.onButtonClick}
                        intent={props.info ? "primary" : "warning"}
                        small
                        style={{ marginTop: 5 }}
                    >
                        {props.buttonText}
                    </Button>
                )}
            </Callout>
        </Collapse>
    )
}
