import React from "react";
import GUID from "../types/generic/GUID";
import useElement from "./useElement";

export default function useSprite(elementID: GUID) {
    const [elem] = useElement(elementID);
    const [sprite, setSprite] = React.useState<HTMLImageElement | null>(null);

    React.useEffect(() => {
        if (elem.id === elementID) {
            const url = elem.properties.spriteData ?
                elem.properties.spriteData :
                "/sprites/" + elem.type + ".png";

            const img = new window.Image();
            img.src = url;
            img.onload = () => {
                setSprite(img);
            };
        }
    }, [elem, setSprite, elementID]);

    return sprite;
}