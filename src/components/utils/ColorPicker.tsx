import { Button, Icon, Intent, Popover } from "@blueprintjs/core";
import React from "react";
import { ChromePicker } from "react-color";
import LIColor from "../../types/li/LIColor";

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
    intent?: Intent,
}

export default function ColorPicker(props: ColorPickerProps) {
    const [color, setColor] = React.useState(props.color);

    React.useEffect(() => {
        setColor(props.color);
    }, [props.color]);

    return (
        <Popover
            fill={props.fill}
            hasBackdrop={true}
            onOpened={props.onOpen}
            onClosed={props.onClose}
            content={
                <ChromePicker
                    styles={{
                        default: {
                            body: {
                                backgroundColor: "#2f343c"
                            }
                        }
                    } as any}
                    color={color}
                    disableAlpha={props.disableAlpha}
                    onChange={(color) => {
                        setColor(color.rgb as LIColor);
                    }}
                    onChangeComplete={(color) => {
                        props.onChange(color.rgb as LIColor);
                    }}
                />
            }
            renderTarget={({ isOpen, ref, ...rest }) => (
                <Button
                    {...rest}
                    ref={ref}
                    fill={props.fill}
                    minimal={props.minimal}
                    intent={props.intent}
                    icon={
                        <Icon
                            icon="tint"
                            color={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}
                        />
                    }
                    text={props.title}
                    style={props.style}
                />
            )}
        />
    );
}