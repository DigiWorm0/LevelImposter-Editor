import React from "react";
import { Group, Image, Rect } from "react-konva";
import useColoredSprite from "../../hooks/canvas/sprite/useColoredSprite";
import { useIsSelectedCollider } from "../../hooks/elements/colliders/useSelectedCollider";
import useElement from "../../hooks/elements/useElements";
import { useIsSelectedElem, useSetSelectedElemID } from "../../hooks/elements/useSelectedElem";
import useEmbed from "../../hooks/embed/useEmbed";
import { useSettingsValue } from "../../hooks/useSettings";
import { UNITY_SCALE } from "../../types/generic/Constants";
import GUID from "../../types/generic/GUID";
import getElemVisibility, { ElemVisibility } from "../../utils/getMapVisibility";
import setCursor from "../../utils/setCursor";
import RoomText from "./RoomText";
import SecondaryRender from "./SecondaryRender";

const SECONDARY_RENDER_TYPES = [
    "util-starfield",
    "util-blankscroll",
    "util-blankfloat"
];

export default function MapElement(props: { elementID: GUID }) {
    const setSelectedID = useSetSelectedElemID();
    const isEmbedded = useEmbed();
    const isColliderSelected = useIsSelectedCollider();
    const isSelected = useIsSelectedElem(props.elementID);
    const { isGridSnapEnabled, gridSnapResolution, invisibleOpacity } = useSettingsValue();
    const [elem, setElement] = useElement(props.elementID);
    const [isHovering, setHovering] = React.useState(false);
    const coloredSprite = useColoredSprite(props.elementID);

    if (!elem || elem.type === "util-layer")
        return null;

    const elemVisibility = getElemVisibility(elem);
    const w = (coloredSprite?.width ?? 0) * elem.xScale;
    const h = (coloredSprite?.height ?? 0) * elem.yScale;
    const isVisible = elem.properties.isVisible ?? true;
    const opacity =
        (isColliderSelected ? 0.5 : 1) * // If Collider is Selected
        (isVisible ? 1 : (isSelected ? invisibleOpacity : 0)) * // If Element is Visible
        (elemVisibility === ElemVisibility.Visible || isSelected ? 1 : invisibleOpacity) * // If Element is Visible in Current Layer
        (SECONDARY_RENDER_TYPES.includes(elem.type) && isSelected ? invisibleOpacity : 1); // If Element has Secondary Render

    return (
        <Group
            x={elem.x * UNITY_SCALE}
            y={-elem.y * UNITY_SCALE}
            scaleX={elem.xScale < 0 ? -1 : 1}
            scaleY={elem.yScale < 0 ? -1 : 1}
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
                if (isGridSnapEnabled) {
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
                e.cancelBubble = true;
            }}
            onMouseEnter={e => {
                setHovering(true);
                setCursor(e, elem.properties.isLocked ? "default" : "pointer");
            }}
            onMouseLeave={e => {
                setHovering(false);
                setCursor(e, "default");
            }}
            draggable={false}
            listening={!isColliderSelected && !isEmbedded && isVisible}
        >

            <Image
                opacity={opacity}
                x={-w / 2}
                y={-h / 2}
                width={w}
                height={h}
                image={coloredSprite}
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

            {(elem.type === "util-room" && (elem.properties.isRoomNameVisible ?? true)) &&
                <RoomText name={elem.name} />
            }
        </Group>
    );
}