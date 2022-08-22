import React from "react";
import AUElementDB from "../types/au/AUElementDB";
import { MaybeGUID } from "../types/generic/GUID";
import { useElementValue } from "./jotai/useElement";

const DEFAULT_URL = "/sprites/util-unknown.png";

const spriteCache: Record<string, HTMLImageElement> = {};

export function useSpriteSrc(elementID: MaybeGUID) {
    const elem = useElementValue(elementID);
    const [spriteURL, setSpriteURL] = React.useState<string>(DEFAULT_URL);

    React.useEffect(() => {
        if (elem) {
            const dbIndex = AUElementDB.findIndex((e) => e.type === elem.type);
            const spriteURL = elem.properties.spriteData;
            const typeURL = "/sprites/" + elem.type + ".png";

            if (spriteURL === undefined) {
                if (dbIndex !== -1)
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
    const [sprite, setSprite] = React.useState<HTMLImageElement | null>(null);

    React.useEffect(() => {
        if (spriteURL in spriteCache) {
            setSprite(spriteCache[spriteURL]);
        }
        const img = new window.Image();
        img.src = spriteURL;
        img.onload = () => {
            setSprite(img);
            spriteCache[spriteURL] = img;
        };
    }, [spriteURL]);

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