import React from "react";
import { Group, Image, Rect, Text } from "react-konva";
import useElement from "../../hooks/useElement";
import useSelected from "../../hooks/useSelected";
import GUID from "../../types/generic/GUID";

const UNITY_SCALE = 100;
const RECT_PADDING = 5;

export default function MapElement(props: { elementID: GUID }) {
    const [elem, setElement, version] = useElement(props.elementID);
    const [sprite, setSprite] = React.useState<HTMLImageElement | null>(null);
    const [selectedID, setSelectedID] = useSelected();
    const [isHovering, setHovering] = React.useState(false);

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

    const w = (sprite ? sprite.width : 0) * elem.xScale;
    const h = (sprite ? sprite.height : 0) * elem.yScale;
    const isSelected = selectedID === props.elementID;

    return (
        <Group
            x={elem.x * UNITY_SCALE}
            y={elem.y * UNITY_SCALE}
            rotation={elem.rotation}
            onDragStart={(e) => {
                setSelectedID(props.elementID);
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
            draggable>

            <Image
                x={-w / 2}
                y={-h / 2}
                width={w}
                height={h}
                scaleX={elem.xScale}
                scaleY={elem.yScale}
                image={sprite as CanvasImageSource}
            />

            {isSelected || isHovering ? (
                <Rect
                    x={-w / 2 - RECT_PADDING}
                    y={-h / 2 - RECT_PADDING}
                    width={w + RECT_PADDING * 2}
                    height={h + RECT_PADDING * 2}
                    scaleX={elem.xScale}
                    scaleY={elem.yScale}
                    stroke={isSelected ? "red" : "gray"}
                    strokeWidth={1}
                />
            ) : null}

        </Group>
    );
}