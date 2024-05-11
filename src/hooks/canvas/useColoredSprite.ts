import React from "react";
import { MaybeGUID } from "../../types/generic/GUID";
import { useElementValue } from "../map/elements/useElements";
import useSprite from "./useSprite";
import Konva from "konva";

export default function useColoredSprite(elementID: MaybeGUID) {
    const element = useElementValue(elementID);
    const sprite = useSprite(elementID);
    const imageRef = React.useRef<Konva.Image>(null);

    React.useEffect(() => {
        const color = element?.properties.color;
        const isWhite = color && color.r === 255 && color.g === 255 && color.b === 255 && color.a === 1;

        if (imageRef.current && sprite && color && !isWhite) {
            const canvas = document.createElement("canvas");
            canvas.width = sprite.width as number;
            canvas.height = sprite.height as number;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(sprite, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < imageData.data.length; i += 4) {
                    imageData.data[i] *= color.r / 255;
                    imageData.data[i + 1] *= color.g / 255;
                    imageData.data[i + 2] *= color.b / 255;
                    imageData.data[i + 3] *= color.a;
                }
                ctx.putImageData(imageData, 0, 0);
                imageRef.current.image(canvas);
            }
            canvas.remove();
        } else {
            imageRef.current?.image(sprite as any);
        }
    }, [element?.properties.color, sprite, imageRef]);

    return imageRef;
}