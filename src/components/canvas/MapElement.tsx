import React from "react";
import {Group, Rect} from "react-konva";
import {useIsSelectedCollider} from "../../hooks/elements/colliders/useSelectedCollider";
import useElement from "../../hooks/elements/useElements";
import {useIsSelectedElem, useSetSelectedElemID} from "../../hooks/elements/useSelectedElem";
import useEmbed from "../../hooks/embed/useEmbed";
import {useSettingsValue} from "../../hooks/useSettings";
import {UNITY_SCALE} from "../../types/generic/Constants";
import GUID from "../../types/generic/GUID";
import setCursor from "../../utils/canvas/setCursor";
import MapElementImage from "./MapElementImage";
import useSprite from "../../hooks/canvas/sprite/useSprite";
import {useElementChildIDs} from "../../hooks/elements/useElementChildIDs";
import useMapElementOpacity from "../../hooks/canvas/useMapElementOpacity";
import SecondaryRender from "./SecondaryRender";
import RoomText from "./RoomText";

export interface MapElementProps {
    elementID: GUID;
}

export default function MapElement(props: MapElementProps) {
    const setSelectedID = useSetSelectedElemID();
    const isEmbedded = useEmbed();
    const isColliderSelected = useIsSelectedCollider();
    const isSelected = useIsSelectedElem(props.elementID);
    const {isGridSnapEnabled, gridSnapResolution} = useSettingsValue();
    const [elem, setElement] = useElement(props.elementID);
    const [isHovering, setHovering] = React.useState(false);
    const coloredSprite = useSprite(props.elementID);
    const childIDs = useElementChildIDs(props.elementID);
    const opacity = useMapElementOpacity(props.elementID);

    if (!elem)
        return null;

    const w = coloredSprite?.width ?? 0;
    const h = coloredSprite?.height ?? 0;
    const isVisible = elem.properties.isVisible ?? true;
    const isLocked = elem.properties.isLocked ?? false;
    const isLayer = elem.type === "util-layer";

    return (
        <Group
            x={elem.x * UNITY_SCALE}
            y={-elem.y * UNITY_SCALE}
            scaleX={elem.xScale}
            scaleY={elem.yScale}
            rotation={-elem.rotation}

            onDragStart={(e) => {
                e.cancelBubble = true;
                setSelectedID(props.elementID);
            }}
            onDragMove={(e) => {
                e.cancelBubble = true;
                if (isGridSnapEnabled) {
                    e.target.position({
                        x: Math.round(e.target.x() / UNITY_SCALE / gridSnapResolution) * UNITY_SCALE * gridSnapResolution,
                        y: Math.round(e.target.y() / UNITY_SCALE / gridSnapResolution) * UNITY_SCALE * gridSnapResolution
                    });
                }
            }}
            onDragEnd={(e) => {
                e.cancelBubble = true;
                const x = e.target.x() / UNITY_SCALE;
                const y = -e.target.y() / UNITY_SCALE;
                if (x !== elem.x || y !== elem.y)
                    setElement({...elem, x, y});
            }}

            draggable={false}
        >
            {/* Main Image */}
            <MapElementImage
                elementID={props.elementID}
                imageProps={{opacity}}
            />

            {/* Selection Border */}
            {(isSelected || isHovering) && (
                <Rect
                    x={-w / 2}
                    y={-h / 2}
                    width={w}
                    height={h}
                    stroke={isSelected ? "#CD4246" : "#C5CBD3"}
                    strokeWidth={2}
                    listening={false}
                    strokeScaleEnabled={false}
                />
            )}

            {/* Click Area */}
            <Rect
                x={-w / 2}
                y={-h / 2}
                width={w}
                height={h}
                opacity={0}

                onMouseDown={(e) => {
                    const isLeftClick = e.evt.button === 0;
                    if (isLeftClick && !isLocked) {
                        e.cancelBubble = true;
                        e.target.getParent().startDrag();
                    }
                }}
                onClick={(e) => {
                    e.cancelBubble = true;
                    e.target.getParent().stopDrag();
                    setSelectedID(props.elementID);
                }}
                onMouseEnter={e => {
                    setHovering(true);
                    setCursor(e, isLocked ? "default" : "pointer");
                }}
                onMouseLeave={e => {
                    setHovering(false);
                    setCursor(e, "default");
                }}
                draggable={false}
                listening={
                    !isColliderSelected &&
                    !isEmbedded &&
                    (!isLayer || isSelected) &&
                    isVisible
                }
            />

            {/* Children */}
            {childIDs.map(childID => (
                <MapElement
                    key={childID}
                    elementID={childID}
                />
            ))}

            {isSelected && <SecondaryRender/>}
            {/*{isAnimating && <AnimRenderer id={props.elementID}/>}*/}
            {(elem.type === "util-room" && (elem.properties.isRoomNameVisible ?? true)) &&
                <RoomText name={elem.name}/>
            }
        </Group>
    );
}