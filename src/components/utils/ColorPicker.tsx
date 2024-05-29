import React from "react";
import LIColor from "../../types/li/LIColor";
import { Button, Popover } from "@mui/material";
import { Palette } from "@mui/icons-material";
import { RgbaColorPicker } from "react-colorful";

interface ColorPickerProps {
    color: LIColor,
    onChange: (color: LIColor) => void,

    onOpen?: () => void,
    onClose?: () => void,
    fill?: boolean,
    minimal?: boolean,
    style?: React.CSSProperties,
    disableAlpha?: boolean,
    title?: string,
    intent?: "primary" | "secondary" | "success" | "warning" | "error" | "info" | undefined
}

export default function ColorPicker(props: ColorPickerProps) {
    const [color, setColor] = React.useState(props.color);
    const [buttonElement, setButtonElement] = React.useState<HTMLButtonElement | null>(null);

    React.useEffect(() => {
        if (buttonElement == null)
            setColor(props.color);
    }, [buttonElement, props.color]);

    return (
        <>
            <Popover
                open={buttonElement !== null}
                onClose={() => setButtonElement(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                anchorEl={buttonElement}
            >
                <RgbaColorPicker
                    color={color}
                    onChange={props.onChange}
                />
            </Popover>
            <Button
                size={"small"}
                color={props.intent ?? "primary"}
                style={props.style}
                onClick={(e) => setButtonElement(e.currentTarget)}
                endIcon={props.title ? <Palette /> : null}
            >
                {props.title ? props.title : <Palette />}
            </Button>
        </>
    );
}