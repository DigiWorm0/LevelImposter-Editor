import { Menu, MenuItem } from "@blueprintjs/core";
import generateGUID from "../../hooks/generateGUID";
import { useSelectedColliderID } from "../../hooks/jotai/useSelectedCollider";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import LICollider from "../../types/li/LICollider";
import ColliderEditorPanel from "./ColliderEditorPanel";
import PanelContainer from "./PanelContainer";

export default function ColliderPanel() {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedColliderID, setSelectedColliderID] = useSelectedColliderID();

    const addCollider = () => {
        if (!selectedElem)
            return;
        if (selectedElem.properties.colliders === undefined)
            selectedElem.properties.colliders = [];

        const collider = {
            id: generateGUID(),
            blocksLight: selectedElem.type !== "util-room",
            isSolid: selectedElem.type === "util-room",
            points: [
                { x: -0.5, y: 0.5 },
                { x: -0.5, y: -0.5 },
                { x: 0.5, y: -0.5 },
                { x: 0.5, y: 0.5 },
            ]
        };

        const elem = {
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                colliders: [
                    ...selectedElem.properties.colliders,
                    collider
                ]
            }
        };
        setSelectedElem(elem);
        setSelectedColliderID(collider?.id);
    }
    const editCollider = (collider: LICollider | null) => {
        if (selectedColliderID === collider?.id)
            setSelectedColliderID(undefined);
        else
            setSelectedColliderID(collider?.id);
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
                        <div key={collider.id + + "-" + index}>
                            <MenuItem
                                icon="edit"
                                text={"Collider " + (index + 1)}
                                onClick={() => editCollider(collider)}
                                active={selectedColliderID === collider.id}
                            />

                            {selectedColliderID === collider.id && (
                                <ColliderEditorPanel />
                            )}
                        </div>
                    );
                })}
            </Menu>
        </PanelContainer>
    );
}
