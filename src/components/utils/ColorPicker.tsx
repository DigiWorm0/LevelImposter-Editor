import { Button, Icon } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import React from "react";
import { ChromePicker } from "react-color";
import LIColor from "../../types/li/LIColor";

interface ColorPickerProps {
    title: string,
    color: LIColor,
    disableAlpha?: boolean,
    onChange: (color: LIColor) => void,
    onOpen?: () => void,
    onClose?: () => void,
    fill?: boolean,
    minimal?: boolean,
    style?: React.CSSProperties
}

export default function ColorPicker(props: ColorPickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [color, setColor] = React.useState(props.color);

    React.useEffect(() => {
        setColor(props.color);
    }, [props.color]);

    return (
        <div>
            <Popover2
                fill={props.fill}
                hasBackdrop={true}
                isOpen={isOpen}
                onInteraction={(nextOpenState) => setIsOpen(nextOpenState)}
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
                }>
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    fill={props.fill}
                    minimal={props.minimal}
                    icon={
                        <Icon
                            icon="tint"
                            style={{
                                color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                            }}
                        />
                    }
                    text={props.title}
                    style={props.style}
                />
            </Popover2>
        </div>
    );
}