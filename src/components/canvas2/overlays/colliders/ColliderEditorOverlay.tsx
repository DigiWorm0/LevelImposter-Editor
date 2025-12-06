import React, {RefObject} from "react";
import useSelectedCollider from "../../../../hooks/elements/colliders/useSelectedCollider";
import useSelectedColliderPointIndexes from "../../../../hooks/elements/colliders/useSelectedColliderPointIndexes";
import {Container, Graphics} from "pixi.js";
import {drawColliderFill, drawColliderStroke} from "./ColliderOverlay";
import LICollider from "../../../../types/li/LICollider";
import ColliderEditorPoint from "./ColliderEditorPoint";
import SelectOperation from "../../../../types/common/SelectOperation";
import {useInsertPointAtMouse} from "../../../../hooks/elements/colliders/useInsertColliderPointAtMouse";
import useMapElementRef from "../../../../hooks/canvas/useMapElementRef";
import {useSelectedElemIDValue} from "../../../../hooks/elements/useSelectedElem";

function drawCollider(
    g: Graphics,
    collider: LICollider,
    mapElementRef: RefObject<Container | null>,
    fill: boolean = true,
    strokeWidth: number = 4
) {
    g.clear();
    drawColliderStroke(g, collider, mapElementRef, strokeWidth);
    if (fill)
        drawColliderFill(g, collider);
}

export default function ColliderEditorOverlay() {
    const [collider, setCollider] = useSelectedCollider();
    const insertPointAtMouse = useInsertPointAtMouse();  // TODO: Add/remove points to collider
    const [selectedIndexes, setSelectedIndexes] = useSelectedColliderPointIndexes();

    const selectedElementID = useSelectedElemIDValue();
    const mapElementRef = useMapElementRef(selectedElementID);

    const strokeGraphicsRef = React.useRef<Graphics>(null);
    const fillGraphicsRef = React.useRef<Graphics>(null);

    const selectIndex = (index: number, operation: SelectOperation) => {
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
        } else {
            throw new Error(`Unknown select operation: ${operation}`);
        }
    };

    if (!collider)
        return null;
    return (
        <pixiContainer>
            {/* Interactable collider edge */}
            <pixiGraphics
                cursor={"pointer"}
                eventMode={"static"}
                ref={strokeGraphicsRef}
                onMouseDown={(e: MouseEvent) => insertPointAtMouse(e)}
                draw={(g) => drawCollider(g, collider, mapElementRef, false)}
            />

            {/* Draw the collider fill */}
            <pixiGraphics
                eventMode={"none"}
                ref={fillGraphicsRef}
                draw={(g) => drawCollider(g, collider, mapElementRef, true)}
            />

            {collider.points.map((point, index) => (
                <ColliderEditorPoint
                    key={`${collider.id}-${index}`}
                    id={`${collider.id}-${index}`}
                    selected={selectedIndexes.includes(index)}

                    collider={collider}
                    point={point}

                    onUpdatePoint={(p) => {
                        // Apply the new point coordinates
                        point.x = p.x;
                        point.y = p.y;

                        // Create a new point array to trigger reactivity
                        const points = collider.points.map((pt, i) => i === index ? {...point} : pt);

                        // Force re-render of the collider
                        setCollider({
                            ...collider,
                            points: [...points]
                        });
                    }}

                    onSelectPoint={(operation) => selectIndex(index, operation)}

                    onRemovePoint={() => {
                        // Splice the point out of the collider points array
                        collider.points.splice(index, 1);

                        // Force re-render of the collider
                        setCollider({
                            ...collider,
                            points: [...collider.points]
                        });

                    }}

                    onForceRedraw={() => {
                        // Check if the graphics references are set
                        if (!strokeGraphicsRef.current ||
                            !fillGraphicsRef.current)
                            return;

                        // Redraw the colliders
                        drawCollider(strokeGraphicsRef.current, collider, mapElementRef, false);
                        drawCollider(fillGraphicsRef.current, collider, mapElementRef, true);
                    }}
                />
            ))}
        </pixiContainer>
    );
}