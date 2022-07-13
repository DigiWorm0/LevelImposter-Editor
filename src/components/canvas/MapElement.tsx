import React from "react";
import { Group, Image, Rect } from "react-konva";
import useMouse from "../../hooks/input/useMouse";
import useColliderEditing from "../../hooks/useColliderEditing";
import useElement from "../../hooks/useElement";
import useSelected from "../../hooks/useSelected";
import useSprite from "../../hooks/useSprite";
import GUID from "../../types/generic/GUID";

const UNITY_SCALE = 100;

export default function MapElement(props: { elementID: GUID }) {
    const [elem, setElement] = useElement(props.elementID);
    const sprite = useSprite(props.elementID);
    const [selectedID, setSelectedID] = useSelected();
    const [colliderID] = useColliderEditing();
    const [isHovering, setHovering] = React.useState(false);
    const [, , rightMouse, onMouseDown, onMouseUp] = useMouse();

    const w = sprite ? sprite.width : 0;
    const h = sprite ? sprite.height : 0;
    const isSelected = selectedID === props.elementID;

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
            }}
            onDragMove={(e) => {
                elem.x = e.target.x() / UNITY_SCALE;
                elem.y = -e.target.y() / UNITY_SCALE;
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
            }}
            onMouseLeave={(e) => {
                setHovering(false);
            }}
            draggable={!rightMouse && !elem.properties.isLocked}
            listening={!rightMouse && colliderID == ""}>

            <Image
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
                    stroke={isSelected ? "red" : "gray"}
                    strokeWidth={1}
                />
            ) : null}

        </Group>
    );
}