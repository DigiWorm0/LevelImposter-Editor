import { Button, Card, ControlGroup, Divider, FormGroup, H5, H6, Menu, MenuItem, NumericInput, Switch } from "@blueprintjs/core";
import generateGUID from "../../hooks/generateGUID";
import { useSelectedColliderID, useSelectedColliderValue } from "../../hooks/jotai/useSelectedCollider";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import LICollider from "../../types/li/LICollider";

export default function ColliderPanel() {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedColliderID, setSelectedColliderID] = useSelectedColliderID();
    const selectedCollider = useSelectedColliderValue();

    const addCollider = () => {
        if (!selectedElem)
            return;
        if (!selectedElem.properties.colliders)
            selectedElem.properties.colliders = [];
        selectedElem.properties.colliders.push({
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
        setSelectedElem(selectedElem);
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

    if (!selectedElem)
        return null;

    return (
        <div className="collider-panel">
            <H5 style={{ marginTop: 25 }}>Colliders</H5>
            <Divider />

            <Menu>
                <MenuItem icon="add" text="Add Collider" onClick={addCollider} />

                {selectedElem.properties.colliders?.map((collider, index) => {
                    return (
                        <MenuItem
                            key={collider.id + index}
                            icon="edit"
                            text={"Collider " + (index + 1)}
                            onClick={() => editCollider(collider)}
                            active={selectedColliderID === collider.id}
                        />
                    );
                })}
            </Menu>

            {selectedCollider && (
                <Card>
                    <H6>Edit Collider:</H6>

                    <Switch
                        label="Is Solid"
                        checked={selectedCollider.isSolid}
                        onChange={(e) => {
                            selectedCollider.isSolid = e.currentTarget.checked;
                            setSelectedElem(selectedElem);
                        }} />
                    <Switch
                        label="Blocks Light"
                        checked={selectedCollider.blocksLight}
                        onChange={(e) => {
                            selectedCollider.blocksLight = e.currentTarget.checked;
                            setSelectedElem(selectedElem);
                        }} />
                    <FormGroup label="Points">
                        <NumericInput
                            fill
                            disabled={!selectedCollider}
                            minorStepSize={0.001}
                            value={selectedCollider?.points.length}
                            onValueChange={(value) => {
                                if (value < 0)
                                    return;
                                for (let i = 0; i < value; i++) {
                                    if (selectedCollider.points[i] == null)
                                        selectedCollider.points[i] = { x: 0, y: 0 };
                                }
                                for (let i = selectedCollider.points.length - 1; i >= value; i--) {
                                    selectedCollider.points.splice(i, 1);
                                }
                                setSelectedElem(selectedElem);
                            }} />
                    </FormGroup>
                    <div>
                        {selectedCollider.points.map((point, index) => {
                            return (
                                <ControlGroup fill key={index}>
                                    <NumericInput
                                        fill
                                        disabled={!selectedCollider}
                                        minorStepSize={0.001}
                                        value={point.x}
                                        onValueChange={(value) => {
                                            selectedCollider.points[index].x = value;
                                            setSelectedElem(selectedElem);
                                        }} />
                                    <NumericInput
                                        fill
                                        disabled={!selectedCollider}
                                        minorStepSize={0.001}
                                        value={point.y}
                                        onValueChange={(value) => {
                                            selectedCollider.points[index].y = value;
                                            setSelectedElem(selectedElem);
                                        }} />
                                </ControlGroup>
                            );
                        })}
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Button icon="tick" intent="success" onClick={() => editCollider(null)} style={{ marginRight: 5 }} />
                        <Button icon="trash" intent="danger" onClick={() => delCollider(selectedCollider)} />
                    </div>
                </Card>
            )}
        </div>
    );
}
