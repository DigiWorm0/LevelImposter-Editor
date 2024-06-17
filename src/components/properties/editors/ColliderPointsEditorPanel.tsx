import FlexNumericInput from "../util/FlexNumericInput";
import InputGroup from "../input/InputGroup";
import React from "react";
import useCollider from "../../../hooks/elements/colliders/useCollider";
import { MaybeGUID } from "../../../types/generic/GUID";

export interface ColliderPointsEditorPanelProps {
    colliderID: MaybeGUID;
}

export default function ColliderPointsEditorPanel(props: ColliderPointsEditorPanelProps) {
    const [collider, setCollider] = useCollider(props.colliderID);

    const updatePoint = React.useCallback((x: number, y: number, index: number) => {
        if (!collider)
            return;
        const points = collider.points.map((p, i) => {
            if (i === index)
                return { x, y };
            return p;
        });
        setCollider({ ...collider, points });
    }, [collider, setCollider]);

    const updatePointCount = React.useCallback((count: number) => {
        if (!collider)
            return;
        const points = collider.points;
        if (count > points.length) {
            for (let i = points.length; i < count; i++)
                points.push({ x: 0, y: 0 });
        } else {
            points.splice(count);
        }
        setCollider({ ...collider, points });
    }, [collider, setCollider]);

    if (!collider)
        return null;
    return (
        <>
            <FlexNumericInput
                value={collider.points.length}
                onChange={(value) => updatePointCount(value)}
                inputProps={{
                    fullWidth: true
                }}
            />
            {collider.points.map((point, index) => (
                <InputGroup key={index}>
                    <FlexNumericInput
                        value={point.x}
                        onChange={(value) => updatePoint(value, point.y, index)}
                    />
                    <FlexNumericInput
                        value={point.y}
                        onChange={(value) => updatePoint(point.x, value, index)}
                    />
                </InputGroup>
            ))}
        </>
    );
}