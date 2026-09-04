import {MaybeGUID} from "@/shared/types/GUID";
import useSpriteThumbnail from "../../canvas2/hooks/texture/useSpriteThumbnail";

export interface SpriteWindowProps {
    spriteID: MaybeGUID;
    fallback?: React.ReactNode;
}

export default function SpriteWindow(props: SpriteWindowProps) {
    const thumbnail = useSpriteThumbnail(props.spriteID);

    if (!thumbnail)
        return props.fallback;
    return (
        <img
            src={thumbnail.src}
            width={thumbnail.width}
            height={thumbnail.height}
            alt="Sprite Preview"
        />
    );
}