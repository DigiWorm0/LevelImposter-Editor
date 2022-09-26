import { Button } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import React from "react";
import { ChromePicker, Color, SketchPicker } from "react-color";
import LIColor from "../types/li/LIColor";

interface ColorPickerProps {
    title: string,
    color: LIColor,
    disableAlpha?: boolean,
    onChange: (color: LIColor) => void,
    onOpen?: () => void,
    onClose?: () => void
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
                fill
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
                    fill
                    icon="tint"
                    text={props.title}
                />
            </Popover2>
        </div>
    );
}