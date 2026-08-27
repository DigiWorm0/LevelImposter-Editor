import FlexNumericInput from "../util/FlexNumericInput";
import InputGroup from "../input/InputGroup";
import React from "react";
import {MaybeGUID} from "@/types/common/GUID";
import {useAtomValue} from "jotai";
import {colliderAtomFamily} from "@editor/state/selection/colliderSelectionStore";
import executeCommand from "../../../editor/history/executeCommand";
import {moveColliderPoint} from "@editor/commands/colliders/moveColliderPoint";
import {setColliderPointsLength} from "@editor/commands/colliders/setColliderPointsLength";

export interface ColliderPointsEditorPanelProps {
    colliderID: MaybeGUID;
}

export default function ColliderPointsEditorPanel(props: ColliderPointsEditorPanelProps) {
    const collider = useAtomValue(colliderAtomFamily(props.colliderID));
    if (!collider)
        return null;
    return (
        <>
            <FlexNumericInput
                value={collider.points.length}
                onChange={(value) => executeCommand(setColliderPointsLength(value))}
                inputProps={{
                    fullWidth: true
                }}
            />
            {collider.points.map((point, index) => (
                <InputGroup key={index}>
                    <FlexNumericInput
                        value={point.x}
                        onChange={(value) => executeCommand(moveColliderPoint(index, {...point, x: value}))}
                    />
                    <FlexNumericInput
                        value={point.y}
                        onChange={(value) => executeCommand(moveColliderPoint(index, {...point, y: value}))}
                    />
                </InputGroup>
            ))}
        </>
    );
}