import Konva from "konva";
import React from "react";
import { Group, Image, Rect } from "react-konva";
import useElement from "../../hooks/jotai/useElements";
import { useSetMouseCursor } from "../../hooks/jotai/useMouse";
import { useIsSelectedCollider } from "../../hooks/jotai/useSelectedCollider";
import { useIsSelectedElem, useSetSelectedElemID } from "../../hooks/jotai/useSelectedElem";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import useEmbed from "../../hooks/useEmbed";
import useSprite from "../../hooks/useSprite";
import { DEFAULT_GRID_SNAP_RESOLUTION, DEFAULT_INVISIBLE_OPACITY, UNITY_SCALE } from "../../types/generic/Constants";
import GUID from "../../types/generic/GUID";

const HIDE_ON_SELECT = [
    "util-blankfloat",
    "util-starfield",
];

const HIDE_ON_DESELECT = [
    "util-room",
    "util-blankfloat",
    "util-starfield",
    "util-sound1",
    "util-sound2",
    "util-tele",
    "util-blanktrigger",
    "util-triggerarea",
    "util-triggerrepeat",
    "util-triggertimer",
    "util-triggerconsole",
    "util-triggersound",
    "util-triggerstart",
    "util-spawn1",
    "util-spawn2",
    "util-blank",
    "util-minimap",
    "sab-btnreactor",
    "sab-btnlights",
    "sab-btncomms",
    "sab-btnoxygen",
];

export default function MapElement(props: { elementID: GUID }) {
    const setSelectedID = useSetSelectedElemID();
    const setMouseCursor = useSetMouseCursor();
    const isEmbeded = useEmbed();
    const sprite = useSprite(props.elementID);
    const isColliderSelected = useIsSelectedCollider();
    const isSelected = useIsSelectedElem(props.elementID);
    const settings = useSettingsValue();
    const [elem, setElement] = useElement(props.elementID);
    const [isHovering, setHovering] = React.useState(false);
    const imageRef = React.useRef<Konva.Image>(null);

    React.useEffect(() => {
        const color = elem?.properties.color;
        const isWhite = color && color.r === 255 && color.g === 255 && color.b === 255 && color.a === 1;

        if (imageRef.current && sprite && color && !isWhite) {
            const canvas = document.createElement("canvas");
            canvas.width = sprite.width as number;
            canvas.height = sprite.height as number;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(sprite, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < imageData.data.length; i += 4) {
                    imageData.data[i] *= color.r / 255;
                    imageData.data[i + 1] *= color.g / 255;
                    imageData.data[i + 2] *= color.b / 255;
                    imageData.data[i + 3] *= color.a;
                }
                ctx.putImageData(imageData, 0, 0);
                imageRef.current.image(canvas);
            }
            canvas.remove();
        } else {
            imageRef.current?.image(sprite as any);
        }
    }, [elem?.properties.color, sprite]);

    if (!elem || elem.type === "util-layer")
        return null;

    const w = sprite ? sprite.width : 0;
    const h = sprite ? sprite.height : 0;
    const isVisible = elem.properties.isVisible === undefined ? true : elem.properties.isVisible;
    const gridSnapResolution = settings.gridSnapResolution === undefined ? DEFAULT_GRID_SNAP_RESOLUTION : settings.gridSnapResolution;
    const invisibleOpacity = settings.invisibleOpacity === undefined ? DEFAULT_INVISIBLE_OPACITY : settings.invisibleOpacity;
    const opacity =
        (isColliderSelected ? 0.5 : 1) * // If Collider is Selected
        (isVisible ? 1 : invisibleOpacity) * // If Element is Visible
        ((HIDE_ON_SELECT.includes(elem.type) && isSelected) ? invisibleOpacity : 1) * // If Element is Selected
        ((HIDE_ON_DESELECT.includes(elem.type) && !isSelected && elem.properties.spriteData === undefined) ? Math.sqrt(invisibleOpacity) : 1); // If Element is Deselected

    return (
        <Group
            x={elem.x * UNITY_SCALE}
            y={-elem.y * UNITY_SCALE}
            scaleX={elem.xScale}
            scaleY={elem.yScale}
            rotation={-elem.rotation}
            onMouseDown={(e) => {
                if (e.evt.button === 0 && !elem.properties.isLocked) {
                    e.target.getParent().startDrag();
                }
            }}
            onDragStart={(e) => {
                setSelectedID(props.elementID);
            }}
            onDragMove={(e) => {
                if (settings.isGridSnapEnabled) {
                    e.target.position({
                        x: Math.round(e.target.x() / UNITY_SCALE / gridSnapResolution) * UNITY_SCALE * gridSnapResolution,
                        y: Math.round(e.target.y() / UNITY_SCALE / gridSnapResolution) * UNITY_SCALE * gridSnapResolution
                    })
                }
                //elem.x = e.target.x() / UNITY_SCALE;
                //elem.y = -e.target.y() / UNITY_SCALE;
            }}
            onDragEnd={(e) => {
                const x = e.target.x() / UNITY_SCALE;
                const y = -e.target.y() / UNITY_SCALE;
                setElement({ ...elem, x, y });
            }}
            onClick={(e) => {
                e.target.getParent().stopDrag();
                setSelectedID(props.elementID);
            }}
            onMouseEnter={(e) => {
                setHovering(true);
                if (!elem.properties.isLocked)
                    setMouseCursor("pointer");
                else
                    setMouseCursor("default");
            }}
            onMouseLeave={(e) => {
                setHovering(false);
                setMouseCursor("default");
            }}
            draggable={false}
            listening={!isColliderSelected && !isEmbeded && isVisible}>

            <Image
                opacity={opacity}
                x={-w / 2}
                y={-h / 2}
                width={w}
                height={h}
                image={sprite as CanvasImageSource}
                ref={imageRef}
            />

            {isSelected || isHovering ? (
                <Rect
                    x={-w / 2}
                    y={-h / 2}
                    width={w}
                    height={h}
                    stroke={isSelected ? "#CD4246" : "#C5CBD3"}
                    strokeWidth={2}
                />
            ) : null}
        </Group>
    );
}