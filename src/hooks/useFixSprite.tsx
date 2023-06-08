import React from "react";
import useSelectedElem from "./jotai/useSelectedElem";
import useSprite from "./useSprite";
import { useMapProperties } from "./jotai/useMap";

const SPRITE_PADDING = 10; // px

export default function useFixSprite() {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const sprite = useSprite(selectedElem?.id);
    const [properties] = useMapProperties();

    const fixSprite = React.useCallback(() => {
        if (!selectedElem || !sprite)
            return;

        const xScale = Math.abs(selectedElem.xScale);
        const yScale = Math.abs(selectedElem.yScale);

        // Fix Sprite
        const canvas = document.createElement("canvas");
        canvas.width = (sprite.width * xScale) + (SPRITE_PADDING * 2);
        canvas.height = (sprite.height * yScale) + (SPRITE_PADDING * 2);
        const ctx = canvas.getContext("2d");
        if (!ctx)
            return;

        ctx.imageSmoothingEnabled = !(properties.pixelArtMode ?? false);
        ctx.drawImage(
            sprite,
            SPRITE_PADDING,
            SPRITE_PADDING,
            sprite.width * xScale,
            sprite.height * yScale
        );
        const spriteData = canvas.toDataURL();

        // Fix Colliders
        const colliders = selectedElem.properties.colliders?.map(collider => {
            const { points } = collider;
            return {
                ...collider,
                points: points.map(point => ({
                    ...point,
                    x: point.x * xScale,
                    y: point.y * yScale
                }))
            }
        });

        // Fix Element
        setSelectedElem({
            ...selectedElem,
            xScale: selectedElem.xScale < 0 ? -1 : 1,
            yScale: selectedElem.yScale < 0 ? -1 : 1,
            properties: {
                ...selectedElem.properties,
                spriteData,
                colliders
            }
        });

        console.log("Fixed sprite", selectedElem);
    }, [selectedElem, sprite, properties]);

    return fixSprite;
}