import React from "react";
import useSelectedCollider from "../../../../hooks/elements/colliders/useSelectedCollider";
import {useSettingsValue} from "../../../../hooks/useSettings";
import {UNITY_SCALE} from "../../../../types/amongus/Constants";
import Draggable from "../../common/Draggable";
import {getSelectOperationFromEvent} from "../../../../utils/canvas/getSelectOperationFromEvent";
import useSelectedColliderPointIndexes from "../../../../hooks/elements/colliders/useSelectedColliderPointIndexes";

export default function ColliderEditorOverlay() {
    const [collider, setCollider] = useSelectedCollider();
    // const insertPointAtMouse = useInsertPointAtMouse();  // TODO: Add/remove points to collider
    const {gridSnapResolution, colliderHandleSize, isGridSnapEnabled} = useSettingsValue();
    const [selectedIndexes, setSelectedIndexes] = useSelectedColliderPointIndexes();

    const stroke = collider?.blocksLight ? "#ff0000" : "#00ff00";
    const fillSelected = collider?.blocksLight ? "#990000" : "#009900";
    const fill = collider?.blocksLight ? "#660000" : "#006600";

    const selectIndex = (index: number, operation: "set" | "add" | "toggle") => {
        if (operation === "set") {
            setSelectedIndexes([index]);
        } else if (operation === "add") {
            setSelectedIndexes((prev) => [...new Set([...prev, index])]);
        } else if (operation === "toggle") {
            setSelectedIndexes((prev) => {
                const newIndexes = [...prev];
                const idx = newIndexes.indexOf(index);
                if (idx > -1) {
                    newIndexes.splice(idx, 1);
                } else {
                    newIndexes.push(index);
                }
                return newIndexes;
            });
        }
    };

    if (!collider)
        return null;
    return (
        <pixiContainer>
            {collider.points.map((point, index) => {
                const id = `${collider.id}-${index}`;
                const isSelected = selectedIndexes.includes(index);
                const handleSize = colliderHandleSize * 0.7 * (isSelected ? 1.1 : 1);

                return (
                    <Draggable
                        key={id}
                        id={id}

                        draggable
                        selected={isSelected}

                        x={point.x * UNITY_SCALE}
                        y={point.y * UNITY_SCALE}

                        gridSnapResolution={isGridSnapEnabled ? gridSnapResolution * UNITY_SCALE : undefined}

                        onClick={(e) => {
                            selectIndex(index, getSelectOperationFromEvent(e));
                        }}
                        onDragStart={(e) => {
                            const isTarget = e.targetID === id;
                            if (!isTarget)
                                return;
                            selectIndex(index, getSelectOperationFromEvent(e.pointerEvent, isSelected, true));
                        }}
                        onDragMove={(e) => {
                            point.x = e.x / UNITY_SCALE;
                            point.y = e.y / UNITY_SCALE;
                        }}
                        onDragEnd={() => {
                            setCollider({
                                ...collider,
                                points: [...collider.points]
                            });
                        }}
                    >
                        <pixiGraphics
                            eventMode={"static"}
                            cursor={"pointer"}
                            draw={(g) => {
                                g.clear();
                                g.beginPath();
                                g.rect(handleSize * -0.5, handleSize * -0.5, handleSize, handleSize);
                                g.stroke({color: stroke, width: isSelected ? 4 : 3, alignment: 0.5});
                                g.fill({color: isSelected ? fillSelected : fill});
                            }}
                        />
                    </Draggable>
                );
            })}
        </pixiContainer>
    )
}