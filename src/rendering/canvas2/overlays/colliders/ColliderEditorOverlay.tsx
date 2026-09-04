import React, {RefObject} from "react";
import {Container, Graphics} from "pixi.js";
import {drawColliderFill, drawColliderStroke} from "./ColliderOverlay";
import LICollider from "../../../../types/li/LICollider";
import ColliderEditorPoint from "./ColliderEditorPoint";
import useMapElementRef from "../../element/useMapElementRef";
import {useAtom, useAtomValue} from "jotai";
import {selectedColliderAtom, selectedColliderPointIndicesAtom} from "@editor/selection/stores/colliderSelectionStore";
import executeCommand from "../../../../editor/history/executeCommand";
import {moveColliderPoint} from "@editor/document/elements/colliders/moveColliderPoint";
import {deleteColliderPoint} from "@editor/document/elements/colliders/deleteColliderPoint";
import {insertColliderPointAtMouse} from "@editor/document/elements/colliders/insertColliderPointAtMouse";
import {selectedElementIDAtom} from "@editor/selection/stores/elementSelectionStore";
import {SelectOperation} from "@editor/selection/selectElementID";

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
    const collider = useAtomValue(selectedColliderAtom);
    const [selectedIndexes, setSelectedIndexes] = useAtom(selectedColliderPointIndicesAtom);

    const selectedElementID = useAtomValue(selectedElementIDAtom);
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
                onMouseDown={(e: MouseEvent) => executeCommand(insertColliderPointAtMouse(e))}
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

                    onUpdatePoint={(p) => executeCommand(moveColliderPoint(index, p))}

                    onSelectPoint={(operation) => selectIndex(index, operation)}

                    onRemovePoint={() => executeCommand(deleteColliderPoint(index))}

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