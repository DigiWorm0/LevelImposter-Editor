import {UNITY_SCALE} from "../../../../types/amongus/Constants";
import {getSelectOperationFromEvent} from "../../../../utils/canvas/getSelectOperationFromEvent";
import Draggable from "../../common/Draggable";
import React from "react";
import Vector2 from "../../../../types/transform/Vector2";
import SelectOperation from "../../../../types/common/SelectOperation";
import {useSettingsValue} from "../../../../hooks/useSettings";
import LICollider from "../../../../types/li/LICollider";
import useMapElementRef from "../../../../hooks/canvas/useMapElementRef";
import getOffsetFromElement, {getReverseOffsetToElement} from "../../../../utils/canvas/getOffsetFromElement";
import {useAtomValue} from "jotai";
import {selectedElementIDAtom} from "../../../../editor/state/selection/elementSelectionStore";

export interface ColliderEditorPointProps {
    id: string;
    selected: boolean;

    collider: LICollider;
    point: Vector2;

    onRemovePoint: () => void;
    onUpdatePoint: (point: Vector2) => void;
    onSelectPoint: (operation: SelectOperation) => void;

    onForceRedraw: () => void;
}

export default function ColliderEditorPoint(props: ColliderEditorPointProps) {
    const {gridSnapResolution, colliderHandleSize, isGridSnapEnabled} = useSettingsValue();
    const [isHovering, setIsHovering] = React.useState(false);

    const selectedElementID = useAtomValue(selectedElementIDAtom);
    const mapElementRef = useMapElementRef(selectedElementID);

    const {id, point, selected, collider} = props;

    /*
        Transform point to world space (relative to the map element)
     */
    const transformedPoint = getOffsetFromElement(mapElementRef.current, {
        x: point.x * -UNITY_SCALE,
        y: point.y * -UNITY_SCALE
    });
    const getReverseTransformedPoint = (point: Vector2) => {
        const reversePoint = getReverseOffsetToElement(mapElementRef.current, point);
        return {
            x: reversePoint.x / -UNITY_SCALE,
            y: reversePoint.y / -UNITY_SCALE
        };
    };

    const handleSize = colliderHandleSize * 0.7 * (selected ? 1.1 : 1) * (isHovering ? 1.1 : 1);

    const stroke = collider?.blocksLight ? "#ff0000" : "#00ff00";
    const fillSelected = collider?.blocksLight ? "#990000" : "#009900";
    const fill = collider?.blocksLight ? "#660000" : "#006600";

    return (
        <Draggable
            id={id}
            draggable
            allowRightClick
            selected={selected}

            x={transformedPoint.x}
            y={transformedPoint.y}

            gridSnapResolution={isGridSnapEnabled ? gridSnapResolution * UNITY_SCALE : undefined}

            onClick={(e) => {
                // Right click to delete point
                if (e.pointerEvent?.button === 2)
                    props.onRemovePoint();
                else
                    props.onSelectPoint(getSelectOperationFromEvent(e.pointerEvent));
            }}
            onDragStart={(e) => {
                const isTarget = e.targetID === id;
                if (!isTarget)
                    return;

                props.onSelectPoint(getSelectOperationFromEvent(e.pointerEvent, selected, true));
            }}
            onDragMove={(e) => {
                const reverseTransformedPoint = getReverseTransformedPoint({x: e.x, y: e.y});
                point.x = reverseTransformedPoint.x;
                point.y = reverseTransformedPoint.y;
                props.onForceRedraw();
            }}
            onDragEnd={() => props.onUpdatePoint({...point})}
        >
            <pixiGraphics
                eventMode={"static"}
                cursor={"pointer"}
                draw={(g) => {
                    g.clear();
                    g.beginPath();
                    g.rect(handleSize * -0.5, handleSize * -0.5, handleSize, handleSize);
                    g.stroke({color: stroke, width: selected ? 4 : 3, alignment: 0.5});
                    g.fill({color: selected || isHovering ? fillSelected : fill});
                }}

                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            />
        </Draggable>
    );
}