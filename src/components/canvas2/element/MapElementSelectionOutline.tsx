import {Sprite} from "pixi.js";
import useViewportScale from "../../../hooks/canvas/useViewportScale";

export interface MapElementSelectionOutlineProps {
    isSelected?: boolean;
    isHovering?: boolean;
    sprite: Sprite | null;
}

export default function MapElementSelectionOutline(props: MapElementSelectionOutlineProps) {
    const {isHovering, isSelected, sprite} = props;
    const viewportScale = useViewportScale();

    const spriteWidth = sprite?.width || 64; // Default width if sprite is not loaded
    const spriteHeight = sprite?.height || 64; // Default height if sprite is not loaded
    const strokeWidth = 2 / viewportScale; // Adjust stroke width based on viewport scale

    if (!isSelected && !isHovering)
        return null;
    return (
        <pixiGraphics
            x={-spriteWidth / 2}
            y={-spriteHeight / 2}
            draw={(g) => {
                g.clear();
                g.rect(0, 0, spriteWidth, spriteHeight).stroke({
                    color: 0xFFFFFF,
                    width: strokeWidth,
                    alpha: isSelected ? 0.5 : 0.25,
                });
            }}
        />
    )
}