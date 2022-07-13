import React from "react";
import { Group, Image, Rect, Shape } from "react-konva";
import useColliderEditing from "../../hooks/useColliderEditing";
import useElement, { getElement } from "../../hooks/useElement";
import useMouse from "../../hooks/input/useMouse";
import useSelected from "../../hooks/useSelected";
import GUID from "../../types/generic/GUID";
import CameraRender from "./CameraRender";
import ColliderRender from "./ColliderRender";
import VentConnections from "./VentConnections";

const UNITY_SCALE = 100;
const RECT_PADDING = 5;

export default function MapElement(props: { elementID: GUID }) {
    const [elem, setElement, version] = useElement(props.elementID);
    const [sprite, setSprite] = React.useState<HTMLImageElement | null>(null);
    const [selectedID, setSelectedID] = useSelected();
    const [isHovering, setHovering] = React.useState(false);
    const [colliderID, setColliderID] = useColliderEditing();
    const [, , rightMouse, onMouseDown, onMouseUp] = useMouse();

    React.useEffect(() => {
        if (elem.id === props.elementID) {
            const url = elem.properties.spriteData ?
                elem.properties.spriteData :
                "/sprites/" + elem.type + ".png";

            const img = new window.Image();
            img.src = url;
            img.onload = () => {
                setSprite(img);
            };
        }
    }, [elem, setSprite, props.elementID]);

    const w = (sprite ? sprite.width : 0) * Math.abs(elem.xScale);
    const h = (sprite ? sprite.height : 0) * Math.abs(elem.yScale);
    const isSelected = selectedID === props.elementID;

    return (
        <Group
            x={elem.x * UNITY_SCALE}
            y={elem.y * UNITY_SCALE}
            scaleX={elem.xScale < 0 ? -1 : 1}
            scaleY={elem.yScale < 0 ? -1 : 1}
            rotation={elem.rotation}
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
                elem.y = e.target.y() / UNITY_SCALE;
            }}
            onDragEnd={(e) => {
                const x = e.target.x() / UNITY_SCALE;
                const y = e.target.y() / UNITY_SCALE;
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
            listening={!rightMouse}>

            <Image
                x={-w / 2}
                y={-h / 2}
                width={w}
                height={h}
                image={sprite as CanvasImageSource}
            />

            {isSelected || isHovering ? (
                <Rect
                    x={-w / 2 - RECT_PADDING}
                    y={-h / 2 - RECT_PADDING}
                    width={w + RECT_PADDING * 2}
                    height={h + RECT_PADDING * 2}
                    stroke={isSelected ? "red" : "gray"}
                    strokeWidth={1}
                />
            ) : null}

            <ColliderRender elementID={props.elementID} />
            <VentConnections elementID={props.elementID} />
            <CameraRender elementID={props.elementID} />

        </Group>
    );
}