import { MaybeGUID } from "../../types/generic/GUID";
import useColoredSprite from "../../hooks/canvas/sprite/useColoredSprite";
import { Image } from "react-konva";
import { useElementValue } from "../../hooks/elements/useElements";
import React from "react";
import useImageAnimator from "../../hooks/canvas/useImageAnimator";
import { useIsSelectedElem } from "../../hooks/elements/useSelectedElem";

export interface MapElementImageProps {
    elementID: MaybeGUID;
    imageProps?: Partial<React.ComponentProps<typeof Image>>;
}

export default function MapElementImage(props: MapElementImageProps) {
    const elem = useElementValue(props.elementID);
    const sprite = useColoredSprite(props.elementID);
    const isSelected = useIsSelectedElem(props.elementID);
    const imageRef = useImageAnimator(elem?.properties.spriteID, isSelected);

    const w = (sprite?.width ?? 0) * (elem?.xScale ?? 1);
    const h = (sprite?.height ?? 0) * (elem?.yScale ?? 1);

    return (
        <Image
            ref={imageRef}
            image={sprite}
            x={-w / 2}
            y={-h / 2}
            width={w}
            height={h}

            {...props.imageProps}
        />
    );
}