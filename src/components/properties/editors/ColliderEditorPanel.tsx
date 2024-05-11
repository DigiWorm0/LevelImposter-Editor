import { Button, Collapse, ControlGroup, FormGroup, H6, InputGroup, NumericInput, Switch } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import { MaybeGUID } from "../../../types/generic/GUID";
import DevInfo from "../../utils/DevInfo";

interface ColliderEditorProps {
    isSolidOnly: boolean;
    isShadowOnly: boolean;
    isEdgeOnly: boolean;

    colliderID: MaybeGUID;
    setSelectedColliderID: (id: MaybeGUID) => void;
}

export default function ColliderEditorPanel(props: ColliderEditorProps) {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const colliderID = props.colliderID;
    const collider = React.useMemo(() => {
        return selectedElem?.properties.colliders?.find(c => c.id === colliderID);
    }, [selectedElem, props.colliderID]);

    const deleteCollider = React.useCallback(() => {
        if (!selectedElem)
            return;
        const filteredColliders = selectedElem.properties.colliders?.filter(c => c.id !== colliderID);
        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, colliders: filteredColliders } });
        props.setSelectedColliderID(undefined);
    }, [selectedElem, colliderID, props.setSelectedColliderID]);

    if (!selectedElem || !collider)
        return null;

    return (
        <div style={{ padding: 20 }}>
            <H6>
                {t("collider.edit")}
            </H6>
            <DevInfo>
                {colliderID}
            </DevInfo>

            <InputGroup
                small
                fill
                placeholder={t("collider.name") as string}
                value={collider.name}
                onChange={(e) => {
                    collider.name = e.currentTarget.value;
                    setSelectedElem({ ...selectedElem });
                }}
                style={{
                    marginBottom: 10
                }}
            />
            <Switch
                label={t("collider.solid") as string}
                checked={collider.isSolid}
                disabled={props.isSolidOnly || props.isShadowOnly || props.isEdgeOnly}
                onChange={(e) => {
                    collider.isSolid = e.currentTarget.checked;
                    setSelectedElem({ ...selectedElem });
                }}
            />
            <Switch
                label={t("collider.blocksLight") as string}
                checked={collider.blocksLight}
                disabled={props.isSolidOnly || props.isShadowOnly || props.isEdgeOnly}
                onChange={(e) => {
                    collider.blocksLight = e.currentTarget.checked;
                    setSelectedElem({ ...selectedElem });
                }}
            />
            <Button
                fill
                text={t("collider.points") as string}
                rightIcon={isCollapsed ? "chevron-down" : "chevron-up"}
                onClick={() => setIsCollapsed(!isCollapsed)}
            />

            <Collapse isOpen={isCollapsed}>
                <FormGroup label={t("collider.points") as string}>
                    <NumericInput
                        fill
                        disabled={!collider}
                        min={2}
                        value={collider.points.length}
                        onValueChange={(value) => {
                            if (value < 0)
                                return;
                            const points = [];
                            for (let i = 0; i < value; i++) {
                                if (i < collider.points.length)
                                    points.push({
                                        x: collider.points[i].x,
                                        y: collider.points[i].y
                                    });
                                else
                                    points.push({ x: 0, y: 0 });
                            }
                            collider.points = points;
                            setSelectedElem({ ...selectedElem });
                        }}
                    />
                </FormGroup>

                {collider.points.map((point, index) => (
                    <ControlGroup fill key={index}>
                        <NumericInput
                            fill
                            disabled={!collider}
                            minorStepSize={0.001}
                            stepSize={0.01}
                            majorStepSize={0.1}
                            value={point.x.toString()}
                            onValueChange={(value) => {
                                const points = collider.points.map((p, i) => {
                                    if (i === index)
                                        return { x: value, y: p.y };
                                    return p;
                                });
                                collider.points = points;
                                setSelectedElem({ ...selectedElem });
                            }}
                        />
                        <NumericInput
                            fill
                            disabled={!collider}
                            minorStepSize={0.001}
                            stepSize={0.01}
                            majorStepSize={0.1}
                            value={point.y.toString()}
                            onValueChange={(value) => {
                                const points = collider.points.map((p, i) => {
                                    if (i === index)
                                        return { x: p.x, y: value };
                                    return p;
                                });
                                collider.points = points;
                                setSelectedElem({ ...selectedElem });
                            }}
                        />
                    </ControlGroup>
                ))}
            </Collapse>

            <div style={{ marginTop: 10 }}>
                <Button
                    icon="tick"
                    intent="success"
                    onClick={() => props.setSelectedColliderID(undefined)}
                    style={{ marginRight: 5 }}
                />
                <Button
                    icon="trash"
                    intent="danger"
                    onClick={() => deleteCollider()}
                />
            </div>
        </div>
    )
}