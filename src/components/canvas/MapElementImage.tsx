import {MaybeGUID} from "../../types/generic/GUID";
import useColoredSprite from "../../hooks/canvas/sprite/useColoredSprite";
import {Image} from "react-konva";
import React from "react";

export interface MapElementImageProps {
    elementID: MaybeGUID;
    imageProps?: Partial<React.ComponentProps<typeof Image>>;
}

export default function MapElementImage(props: MapElementImageProps) {
    const sprite = useColoredSprite(props.elementID);

    const w = sprite?.width ?? 0;
    const h = sprite?.height ?? 0;

    return (
        <Image
            image={sprite}
            x={-w / 2}
            y={-h / 2}
            width={w}
            height={h}
            listening={false}

            {...props.imageProps}
        />
    );
}