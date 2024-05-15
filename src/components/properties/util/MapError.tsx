import React from 'react';
import { useSettingsValue } from '../../../hooks/useSettings';
import MaterialIcon, { IconName } from "../../utils/MaterialIcon";
import { Alert, Button, Collapse } from "@mui/material";

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
        <Collapse in={isVisible}>
            <Alert
                severity={props.info ? "info" : "warning"}
                icon={props.icon && (<MaterialIcon icon={props.icon} />)}
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
                        endIcon={props.buttonIcon && (<MaterialIcon icon={props.buttonIcon} />)}
                        onClick={props.onButtonClick}
                        color={props.info ? "primary" : "warning"}
                        size={"small"}
                        style={{ marginTop: 5 }}
                        variant={"contained"}
                    >
                        {props.buttonText}
                    </Button>
                )}
            </Alert>
        </Collapse>
    )
}
