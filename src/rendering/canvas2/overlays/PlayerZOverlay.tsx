import GUID from "@shared/types/GUID";
import {PLAYER_POS, UNITY_SCALE} from "@/types/amongus/Constants";
import useElementSprite from "../hooks/texture/useElementSprite";
import useTextureOfType from "@/rendering/canvas2/hooks/texture/useTextureOfType";
import {useElement} from "@editor/document/elements/useElement";

export interface PlayerZOverlayProps {
    elementID: GUID;
}

const OFFSET_Y = 30; // Offset for the line from the player's feet

export default function PlayerZOverlay(props: PlayerZOverlayProps) {
    const element = useElement(props.elementID);
    const sprite = useElementSprite(props.elementID);
    const playerSprite = useTextureOfType("util-dummy");

    const zPosition = element?.z ?? 0;
    const outOfBounds = Math.abs(zPosition - PLAYER_POS) > 0.1;
    const lineY = (zPosition - PLAYER_POS) * -1000;
    const width = sprite?.width ?? UNITY_SCALE;

    if (!playerSprite || playerSprite.destroyed)
        return null;
    if (!element || outOfBounds)
        return null;
    return (
        <>
            <pixiGraphics
                eventMode={"none"}
                draw={(g) => {
                    g.clear();

                    g.beginPath();
                    g.moveTo(-width / 1.5, lineY * UNITY_SCALE + OFFSET_Y)
                        .lineTo(width / 1.5, lineY * UNITY_SCALE + OFFSET_Y)
                        .stroke({color: 0xffaa00, width: 4, alignment: 0.5});
                    g.closePath();
                    g.stroke();
                }}
            />
            <pixiSprite
                eventMode={"none"}
                anchor={0.5}
                alpha={0.3}
                texture={playerSprite}
                x={0}
                y={lineY * UNITY_SCALE}
            />
        </>
    );
}