import React from "react";
import AUElementDB from "../types/au/AUElementDB";
import { MaybeGUID } from "../types/generic/GUID";
import { useElementValue } from "./jotai/useElement";

const DEFAULT_URL = "/sprites/util-unknown.png";

export default function useSprite(elementID: MaybeGUID, prioritizeType?: boolean) {
    const elem = useElementValue(elementID);
    const [spriteURL, setSpriteURL] = React.useState<string>("");
    const [sprite, setSprite] = React.useState<HTMLImageElement | null>(null);

    React.useEffect(() => {
        const img = new window.Image();
        img.src = spriteURL;
        img.onload = () => {
            setSprite(img);
        };
    }, [spriteURL]);

    React.useEffect(() => {
        if (elem) {
            const dbIndex = AUElementDB.findIndex((e) => e.type === elem.type);
            const spriteURL = elem.properties.spriteData;
            const typeURL = "/sprites/" + elem.type + ".png";

            if (prioritizeType || spriteURL === undefined) {
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
    }, [elem, prioritizeType]);

    return sprite;
}