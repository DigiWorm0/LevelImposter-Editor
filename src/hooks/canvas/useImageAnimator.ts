import React from "react";
import Konva from "konva";
import "gifler";
import {useMapAssetValue} from "../assets/useMapAsset";
import {MaybeGUID} from "../../types/generic/GUID";
import {useSettingsValue} from "../useSettings";
import useImage from "./sprite/useImage";

export default function useImageAnimator(spriteID: MaybeGUID, isAnimating: boolean) {
    const asset = useMapAssetValue(spriteID);
    const defaultImage = useImage(asset?.url ?? "");
    const imageRef = React.useRef<Konva.Image | null>(null);
    const {animateGIFOnSelect} = useSettingsValue();

    React.useEffect(() => {
        if (!asset)
            return;

        // Fallback to normal image if not a gif
        if (asset?.blob.type !== "image/gif" || !isAnimating || !animateGIFOnSelect) {
            const currentImage = imageRef.current?.image();
            if (defaultImage && currentImage !== defaultImage)
                imageRef.current?.image(defaultImage);
            return;
        }

        // Load gif
        const bufferCanvas = document.createElement("canvas");

        let anim: Gifler.Animator | null = null;
        let isInitialized = false;
        window.gifler(asset.url).get((animator) => {
            anim = animator;
            anim.animateInCanvas(bufferCanvas);
            anim.onDrawFrame = (ctx, frame) => {
                ctx.drawImage(frame.buffer, frame.x, frame.y);
                imageRef.current?.getLayer()?.batchDraw();

                if (!isInitialized)
                    imageRef.current?.image(bufferCanvas);
                isInitialized = true;
            };
        });

        return () => {
            anim?.stop();
            bufferCanvas.remove();
        };
    }, [asset, isAnimating, animateGIFOnSelect, defaultImage]);

    return imageRef;
}