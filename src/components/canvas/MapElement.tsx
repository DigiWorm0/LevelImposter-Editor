import React from "react";
import { Group, Image, Rect } from "react-konva";
import useMouseButtons from "../../hooks/input/useMouse";
import { useSetMouseCursor } from "../../hooks/input/useMouseCursor";
import useElement from "../../hooks/jotai/useElement";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import { useIsSelectedCollider } from "../../hooks/jotai/useSelectedCollider";
import { useIsSelectedElem, useSetSelectedElemID } from "../../hooks/jotai/useSelectedElem";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import useEmbed from "../../hooks/useEmbed";
import useSprite from "../../hooks/useSprite";
import { DEFAULT_GRID_SNAP_RESOLUTION, DEFAULT_INVISIBLE_OPACITY, UNITY_SCALE } from "../../types/generic/Constants";
import GUID from "../../types/generic/GUID";


export default function MapElement(props: { elementID: GUID }) {
    const isEmbeded = useEmbed();
    const [elem, setElement] = useElement(props.elementID);
    const sprite = useSprite(props.elementID);
    const setSelectedID = useSetSelectedElemID();
    const isSelected = useIsSelectedElem(props.elementID);
    const isColliderSelected = useIsSelectedCollider();
    const [isHovering, setHovering] = React.useState(false);
    const [, , rightMouse, onMouseDown, onMouseUp] = useMouseButtons();
    const setMouseCursor = useSetMouseCursor();
    const settings = useSettingsValue();
    const saveHistory = useSaveHistory();

    if (!elem)
        return null;

    const w = sprite ? sprite.width : 0;
    const h = sprite ? sprite.height : 0;
    const isVisible = elem.properties.isVisible === undefined ? true : elem.properties.isVisible;
    const gridSnapResolution = settings.gridSnapResolution === undefined ? DEFAULT_GRID_SNAP_RESOLUTION : settings.gridSnapResolution;
    const invisibleOpacity = settings.invisibleOpacity === undefined ? DEFAULT_INVISIBLE_OPACITY : settings.invisibleOpacity;

    return (
        <Group
            x={elem.x * UNITY_SCALE}
            y={-elem.y * UNITY_SCALE}
            scaleX={elem.xScale}
            scaleY={elem.yScale}
            rotation={-elem.rotation}
            onMouseDown={(e) => {
                onMouseDown(e.evt);
            }}
            onMouseUp={(e) => {
                onMouseUp(e.evt);
            }}
            onDragStart={(e) => {
                setSelectedID(props.elementID);
                saveHistory();
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
            draggable={!rightMouse && !elem.properties.isLocked && !isEmbeded && isVisible}
            listening={!rightMouse && !isColliderSelected && !isEmbeded && isVisible}>

            <Image
                opacity={(isColliderSelected ? 0.5 : 1) * (isVisible ? 1 : invisibleOpacity)}
                x={-w / 2}
                y={-h / 2}
                width={w}
                height={h}
                image={sprite as CanvasImageSource}
            />

            {isSelected || isHovering ? (
                <Rect
                    x={-w / 2}
                    y={-h / 2}
                    width={w}
                    height={h}
                    stroke={isSelected ? "red" : "#aaaaaa"}
                    strokeWidth={1}
                />
            ) : null}

        </Group>
    );
}