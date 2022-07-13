import { Button, Card, ControlGroup, Divider, FormGroup, H5, H6, Menu, MenuItem, NumericInput, Switch } from "@blueprintjs/core";
import React from "react";
import generateGUID from "../../hooks/generateGUID";
import useColliderEditing from "../../hooks/useColliderEditing";
import useElement from "../../hooks/useElement";
import GUID from "../../types/generic/GUID";
import LICollider from "../../types/li/LICollider";

export default function ColliderPanel(props: { elementID: GUID }) {
    const [element, setElement] = useElement(props.elementID);
    const [colliderID, setColliderID] = useColliderEditing();

    const currentCollider = element.properties.colliders?.find(c => c.id === colliderID);

    React.useEffect(() => {
        if (currentCollider) {
            if (element.properties.colliders?.find((collider) => collider.id === currentCollider.id) == null) {
                setColliderID(undefined);
            }
        }
    }, [element]);

    const addCollider = () => {
        if (!element.properties.colliders)
            element.properties.colliders = [];
        element.properties.colliders.push({
            id: generateGUID(),
            blocksLight: true,
            isSolid: false,
            points: [
                { x: -0.5, y: -0.5 },
                { x: 0.5, y: -0.5 },
                { x: 0.5, y: 0.5 },
                { x: -0.5, y: 0.5 },
                { x: -0.5, y: -0.5 }
            ],
        });
        setElement(element);
    }
    const editCollider = (collider: LICollider | null) => {
        if (colliderID === collider?.id)
            setColliderID(undefined);
        else
            setColliderID(collider?.id);
    }
    const delCollider = (collider: LICollider) => {
        element.properties.colliders = element.properties.colliders?.filter(c => c.id !== collider.id);
        setElement(element);
        if (colliderID === collider.id)
            setColliderID(undefined);
    }

    if (element.id === "")
        return null;

    return (
        <div className="collider-panel">
            <H5 style={{ marginTop: 25 }}>Colliders</H5>
            <Divider />

            <Menu>
                <MenuItem icon="add" text="Add Collider" onClick={addCollider} />

                {element.properties.colliders?.map((collider, index) => {
                    return (
                        <MenuItem
                            key={collider.id + index}
                            icon="edit"
                            text={"Collider " + (index + 1)}
                            onClick={() => editCollider(collider)}
                            active={colliderID === collider.id}
                        />
                    );
                })}
            </Menu>

            {currentCollider && (
                <Card>
                    <H6>Edit Collider:</H6>

                    <Switch
                        label="Is Solid"
                        checked={currentCollider.isSolid}
                        onChange={(e) => {
                            currentCollider.isSolid = e.currentTarget.checked;
                            setElement(element);
                        }} />
                    <Switch
                        label="Blocks Light"
                        checked={currentCollider.blocksLight}
                        onChange={(e) => {
                            currentCollider.blocksLight = e.currentTarget.checked;
                            setElement(element);
                        }} />
                    <FormGroup label="Points">
                        <NumericInput
                            fill
                            disabled={!currentCollider}
                            minorStepSize={0.001}
                            value={currentCollider?.points.length}
                            onValueChange={(value) => {
                                if (value < 0)
                                    return;
                                for (let i = 0; i < value; i++) {
                                    if (currentCollider.points[i] == null)
                                        currentCollider.points[i] = { x: 0, y: 0 };
                                }
                                for (let i = currentCollider.points.length - 1; i >= value; i--) {
                                    currentCollider.points.splice(i, 1);
                                }
                                setElement(element);
                            }} />
                    </FormGroup>
                    <div>
                        {currentCollider.points.map((point, index) => {
                            return (
                                <ControlGroup fill key={index}>
                                    <NumericInput
                                        fill
                                        disabled={!currentCollider}
                                        minorStepSize={0.001}
                                        value={point.x}
                                        onValueChange={(value) => {
                                            currentCollider.points[index].x = value;
                                            setElement(element);
                                        }} />
                                    <NumericInput
                                        fill
                                        disabled={!currentCollider}
                                        minorStepSize={0.001}
                                        value={point.y}
                                        onValueChange={(value) => {
                                            currentCollider.points[index].y = value;
                                            setElement(element);
                                        }} />
                                </ControlGroup>
                            );
                        })}
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Button icon="tick" intent="success" onClick={() => editCollider(null)} style={{ marginRight: 5 }} />
                        <Button icon="trash" intent="danger" onClick={() => delCollider(currentCollider)} />
                    </div>
                </Card>
            )}
        </div>
    );
}
