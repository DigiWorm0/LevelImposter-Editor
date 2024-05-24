import { MaybeGUID } from "../../../types/generic/GUID";
import { elementFamilyAtom } from "../../map/elements/useElements";
import { spriteAtomFamily } from "./useSprite";
import { atomFamily, unwrap } from "jotai/utils";
import { atom, useAtomValue } from "jotai";

export const coloredSpriteAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom(async (get) => {
        const sprite = await get(spriteAtomFamily(id));
        const element = get(elementFamilyAtom(id));
        const color = element?.properties.color;
        const isWhite = color && color.r === 255 && color.g === 255 && color.b === 255 && color.a === 1;
        if (!sprite || !color || isWhite)
            return sprite;

        const canvas = document.createElement("canvas");
        canvas.width = sprite.width;
        canvas.height = sprite.height;
        const ctx = canvas.getContext("2d");
        if (!ctx)
            throw new Error("Failed to create canvas context");

        ctx.drawImage(sprite, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] *= color.r / 255;
            imageData.data[i + 1] *= color.g / 255;
            imageData.data[i + 2] *= color.b / 255;
            imageData.data[i + 3] *= color.a;
        }
        ctx.putImageData(imageData, 0, 0);

        return canvas;
    });
});

export default function useColoredSprite(elementID: MaybeGUID) {
    return useAtomValue(unwrap(coloredSpriteAtomFamily(elementID)));
}