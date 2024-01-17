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
import getElemVisibility, { ElemVisibility } from "../../hooks/utils/getMapVisibility";
import SecondaryRender from "./SecondaryRender";
import useColoredSprite from "../../hooks/useColoredSprite";

const SECONDARY_RENDER_TYPES = [
    "util-starfield",
    "util-blankscroll",
    "util-blankfloat"
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
    const spriteRef = useColoredSprite(props.elementID);

    if (!elem || elem.type === "util-layer")
        return null;

    const elemVisibility = getElemVisibility(elem);
    const w = (sprite?.width ?? 0) * elem.xScale;
    const h = (sprite?.height ?? 0) * elem.yScale;
    const isVisible = elem.properties.isVisible ?? true;
    const gridSnapResolution = settings.gridSnapResolution ?? DEFAULT_GRID_SNAP_RESOLUTION;
    const invisibleOpacity = settings.invisibleOpacity ?? DEFAULT_INVISIBLE_OPACITY;
    const opacity =
        (isColliderSelected ? 0.5 : 1) * // If Collider is Selected
        (isVisible ? 1 : (isSelected ? invisibleOpacity : 0)) * // If Element is Visible
        (elemVisibility === ElemVisibility.Visible || isSelected ? 1 : invisibleOpacity) * // If Element is Visible in Current Layer
        (SECONDARY_RENDER_TYPES.includes(elem.type) && isSelected ? invisibleOpacity : 1); // If Element has Secondary Render

    return (
        <Group
            x={elem.x * UNITY_SCALE}
            y={-elem.y * UNITY_SCALE}
            rotation={-elem.rotation}
            onMouseDown={(e) => {
                if (e.evt.button === 0 && !elem.properties.isLocked) {
                    e.target.getParent().startDrag();
                }
            }}
            onDragStart={() => {
                setSelectedID(props.elementID);
            }}
            onDragMove={(e) => {
                if (settings.isGridSnapEnabled ?? true) {
                    e.target.position({
                        x: Math.round(e.target.x() / UNITY_SCALE / gridSnapResolution) * UNITY_SCALE * gridSnapResolution,
                        y: Math.round(e.target.y() / UNITY_SCALE / gridSnapResolution) * UNITY_SCALE * gridSnapResolution
                    })
                }
            }}
            onDragEnd={(e) => {
                const x = e.target.x() / UNITY_SCALE;
                const y = -e.target.y() / UNITY_SCALE;
                if (x !== elem.x || y !== elem.y)
                    setElement({ ...elem, x, y });
            }}
            onClick={(e) => {
                e.target.getParent().stopDrag();
                setSelectedID(props.elementID);
            }}
            onMouseEnter={() => {
                setHovering(true);
                setMouseCursor(elem.properties.isLocked ? "default" : "pointer");
            }}
            onMouseLeave={() => {
                setHovering(false);
                setMouseCursor("default");
            }}
            draggable={false}
            listening={!isColliderSelected && !isEmbeded && isVisible}
        >

            <Image
                opacity={opacity}
                x={-w / 2}
                y={-h / 2}
                width={w}
                height={h}
                image={sprite as CanvasImageSource}
                ref={spriteRef}
            />

            {(isSelected || isHovering) && (
                <Rect
                    x={-w / 2}
                    y={-h / 2}
                    width={w}
                    height={h}
                    stroke={isSelected ? "#CD4246" : "#C5CBD3"}
                    strokeWidth={2}
                    listening={false}
                />
            )}


            {isSelected && (
                <SecondaryRender />
            )}
        </Group>
    );
}