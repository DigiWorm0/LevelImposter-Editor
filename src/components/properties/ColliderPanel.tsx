import { Button, Card, ControlGroup, FormGroup, H6, Menu, MenuItem, NumericInput, Switch } from "@blueprintjs/core";
import generateGUID from "../../hooks/generateGUID";
import { useSelectedColliderID, useSelectedColliderValue } from "../../hooks/jotai/useSelectedCollider";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import LICollider from "../../types/li/LICollider";
import PanelContainer from "./PanelContainer";

export default function ColliderPanel() {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedColliderID, setSelectedColliderID] = useSelectedColliderID();
    const selectedCollider = useSelectedColliderValue();

    const addCollider = () => {
        if (!selectedElem)
            return;
        if (selectedElem.properties.colliders === undefined)
            selectedElem.properties.colliders = [];
        selectedElem.properties.colliders = [...selectedElem.properties.colliders, {
            id: generateGUID(),
            blocksLight: selectedElem.type !== "util-room",
            isSolid: selectedElem.type === "util-room",
            points: [
                { x: -0.5, y: 0.5 },
                { x: -0.5, y: -0.5 },
                { x: 0.5, y: -0.5 },
                { x: 0.5, y: 0.5 },
            ],
        }];
        setSelectedElem({ ...selectedElem });
    }
    const editCollider = (collider: LICollider | null) => {
        if (selectedColliderID === collider?.id)
            setSelectedColliderID(undefined);
        else
            setSelectedColliderID(collider?.id);
    }
    const delCollider = (collider: LICollider) => {
        if (!selectedElem)
            return;
        selectedElem.properties.colliders = selectedElem.properties.colliders?.filter(c => c.id !== collider.id);
        setSelectedElem(selectedElem);
        if (selectedColliderID === collider.id)
            setSelectedColliderID(undefined);
    }

    if (!selectedElem
        || selectedElem.type === "util-minimap")
        return null;

    return (
        <PanelContainer title="Colliders">
            <Menu>
                <MenuItem
                    icon="add"
                    text="Add Collider"
                    disabled={selectedElem.type === "util-room" && selectedElem.properties.colliders && selectedElem.properties.colliders.length > 0}
                    onClick={addCollider} />

                {selectedElem.properties.colliders?.map((collider, index) => {
                    return (
                        <div key={collider.id + index}>
                            <MenuItem
                                icon="edit"
                                text={"Collider " + (index + 1)}
                                onClick={() => editCollider(collider)}
                                active={selectedColliderID === collider.id}
                            />

                            {selectedColliderID === collider.id && (
                                <Card>
                                    <H6>Edit Collider:</H6>

                                    <Switch
                                        label="Is Solid"
                                        checked={collider.isSolid}
                                        disabled={selectedElem.type === "util-room"}
                                        onChange={(e) => {
                                            collider.isSolid = e.currentTarget.checked;
                                            setSelectedElem({ ...selectedElem });
                                        }} />
                                    <Switch
                                        label="Blocks Light"
                                        checked={collider.blocksLight}
                                        disabled={selectedElem.type === "util-room"}
                                        onChange={(e) => {
                                            collider.blocksLight = e.currentTarget.checked;
                                            setSelectedElem({ ...selectedElem });
                                        }} />
                                    <FormGroup label="Points">
                                        <NumericInput
                                            fill
                                            disabled={!selectedCollider}
                                            min={2}
                                            value={selectedCollider?.points.length}
                                            onValueChange={(value) => {
                                                if (value < 0)
                                                    return;
                                                for (let i = 0; i < value; i++) {
                                                    if (collider.points[i] == null)
                                                        collider.points[i] = { x: 0, y: 0 };
                                                }
                                                for (let i = collider.points.length - 1; i >= value; i--) {
                                                    collider.points.splice(i, 1);
                                                }
                                                setSelectedElem({ ...selectedElem });
                                            }} />
                                    </FormGroup>
                                    <div>
                                        {collider.points.map((point, index) => {
                                            return (
                                                <ControlGroup fill key={index}>
                                                    <NumericInput
                                                        fill
                                                        disabled={!selectedCollider}
                                                        minorStepSize={0.001}
                                                        value={point.x}
                                                        onValueChange={(value) => {
                                                            collider.points[index].x = value;
                                                            setSelectedElem({ ...selectedElem });
                                                        }} />
                                                    <NumericInput
                                                        fill
                                                        disabled={!selectedCollider}
                                                        minorStepSize={0.001}
                                                        value={point.y}
                                                        onValueChange={(value) => {
                                                            collider.points[index].y = value;
                                                            setSelectedElem({ ...selectedElem });
                                                        }} />
                                                </ControlGroup>
                                            );
                                        })}
                                    </div>
                                    <div style={{ marginTop: 10 }}>
                                        <Button icon="tick" intent="success" onClick={() => editCollider(null)} style={{ marginRight: 5 }} />
                                        <Button icon="trash" intent="danger" onClick={() => delCollider(collider)} />
                                    </div>
                                </Card>
                            )}
                        </div>
                    );
                })}
            </Menu>
        </PanelContainer>
    );
}
