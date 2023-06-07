import React from "react";
import AUElementDB from "../types/au/AUElementDB";
import { MaybeGUID } from "../types/generic/GUID";
import { useElementValue } from "./jotai/useElements";

const DEFAULT_URL = "/sprites/util-unknown.png";

export function useSpriteSrc(elementID: MaybeGUID) {
    const elem = useElementValue(elementID);
    const [spriteURL, setSpriteURL] = React.useState<string>(DEFAULT_URL);

    React.useEffect(() => {
        if (elem) {
            const spriteURL = elem.properties.spriteData;
            const typeURL = "/sprites/" + elem.type + ".png";

            if (spriteURL === undefined) {
                if (AUElementDB.includes(elem.type))
                    setSpriteURL(typeURL);
                else
                    setSpriteURL(DEFAULT_URL);
            } else {
                setSpriteURL(spriteURL);
            }
        }
        else {
            setSpriteURL(DEFAULT_URL);
        }
    }, [elem]);

    return spriteURL;
}

export default function useSprite(elementID: MaybeGUID) {
    const spriteURL = useSpriteSrc(elementID);
    const [image, setImage] = React.useState<HTMLImageElement>(new window.Image());
    const [sprite, setSprite] = React.useState<HTMLImageElement | null>(null);

    React.useEffect(() => {
        console.log(`Loading Sprite ${elementID}`);
        image.src = spriteURL;
        image.onload = () => {
            console.log(`Loaded Sprite ${elementID}`);
            setSprite(image);
        };

        return () => {
            image.src = "";
            setSprite(null);
        }
    }, [spriteURL, elementID]);

    return sprite;
}

export function useSpriteType(type?: string) {
    const [sprite, setSprite] = React.useState<HTMLImageElement | null>(null);

    React.useEffect(() => {
        console.log(`Loading Sprite ${type}`);
        const img = new window.Image();
        img.src = "/sprites/" + type + ".png";
        img.onload = () => {
            console.log(`Loaded Sprite ${type}`);
            setSprite(img);
        };
    }, [type]);

    return sprite;
}