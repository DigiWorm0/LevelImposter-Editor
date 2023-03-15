import { Button, Collapse, ControlGroup, FormGroup, H6, InputGroup, NumericInput, Switch } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedCollider, { useSelectedColliderID } from "../../../hooks/jotai/useSelectedCollider";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import { MaybeGUID } from "../../../types/generic/GUID";
import DevInfo from "../../utils/DevInfo";

const RESTRICTED_TYPES = [
    "util-room",
    "util-sound1",
    "util-sound2",
    "util-tele",
    "util-triggerarea",
    "util-triggersound",
];

export default function ColliderEditorPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedColliderID, setSelectedColliderID] = useSelectedColliderID();
    const [selectedCollider, setSelectedCollider] = useSelectedCollider();
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const isRestricted = React.useMemo(() => {
        return RESTRICTED_TYPES.includes(selectedElem?.type || "");
    }, [selectedElem?.type]);

    const deleteCollider = React.useCallback((colliderID: MaybeGUID) => {
        if (!selectedElem)
            return;
        const colliders = selectedElem.properties.colliders?.filter(c => c.id !== colliderID);
        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, colliders } });
        if (selectedColliderID === colliderID)
            setSelectedColliderID(undefined);
    }, [selectedElem, selectedColliderID, setSelectedElem, setSelectedColliderID]);

    if (!selectedCollider || !selectedElem)
        return null;

    return (
        <div style={{ padding: 20 }}>
            <H6>
                {t("collider.edit")}
            </H6>
            <DevInfo>
                {selectedCollider.id}
            </DevInfo>

            <InputGroup
                small
                fill
                placeholder={t("collider.name") as string}
                value={selectedCollider.name}
                disabled={isRestricted}
                onChange={(e) => {
                    selectedCollider.name = e.currentTarget.value;
                    setSelectedElem({ ...selectedElem });
                }}
                style={{
                    marginBottom: 10
                }}
            />
            <Switch
                label={t("collider.solid") as string}
                checked={selectedCollider.isSolid}
                disabled={isRestricted}
                onChange={(e) => {
                    selectedCollider.isSolid = e.currentTarget.checked;
                    setSelectedElem({ ...selectedElem });
                }}
            />
            <Switch
                label={t("collider.blocksLight") as string}
                checked={selectedCollider.blocksLight}
                disabled={isRestricted}
                onChange={(e) => {
                    selectedCollider.blocksLight = e.currentTarget.checked;
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
                        disabled={!selectedCollider}
                        min={2}
                        value={selectedCollider?.points.length}
                        onValueChange={(value) => {
                            if (value < 0)
                                return;
                            const points = [];
                            for (let i = 0; i < value; i++) {
                                if (i < selectedCollider.points.length)
                                    points.push({
                                        x: selectedCollider.points[i].x,
                                        y: selectedCollider.points[i].y
                                    });
                                else
                                    points.push({ x: 0, y: 0 });
                            }
                            setSelectedCollider({ ...selectedCollider, points: points });
                        }}
                    />
                </FormGroup>

                {selectedCollider.points.map((point, index) => (
                    <ControlGroup fill key={index}>
                        <NumericInput
                            fill
                            disabled={!selectedCollider}
                            minorStepSize={0.001}
                            stepSize={0.01}
                            majorStepSize={0.1}
                            value={point.x.toString()}
                            onValueChange={(value) => {
                                const points = selectedCollider.points.map((p, i) => {
                                    if (i === index)
                                        return { x: value, y: p.y };
                                    return p;
                                });
                                setSelectedCollider({ ...selectedCollider, points });
                            }}
                        />
                        <NumericInput
                            fill
                            disabled={!selectedCollider}
                            minorStepSize={0.001}
                            stepSize={0.01}
                            majorStepSize={0.1}
                            value={point.y.toString()}
                            onValueChange={(value) => {
                                const points = selectedCollider.points.map((p, i) => {
                                    if (i === index)
                                        return { x: p.x, y: value };
                                    return p;
                                });
                                setSelectedCollider({ ...selectedCollider, points });
                            }}
                        />
                    </ControlGroup>
                ))}
            </Collapse>

            <div style={{ marginTop: 10 }}>
                <Button
                    icon="tick"
                    intent="success"
                    onClick={() => setSelectedColliderID(undefined)}
                    style={{ marginRight: 5 }}
                />
                <Button
                    icon="trash"
                    intent="danger"
                    onClick={() => deleteCollider(selectedCollider?.id)}
                />
            </div>
        </div>
    )
}