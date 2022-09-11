import { Menu } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import generateGUID from "../../hooks/generateGUID";
import { useSelectedColliderID } from "../../hooks/jotai/useSelectedCollider";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import useTranslation from "../../hooks/useTranslation";
import LICollider from "../../types/li/LICollider";
import ColliderEditorPanel from "./ColliderEditorPanel";
import PanelContainer from "./PanelContainer";

export default function ColliderPanel() {
    const translation = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedColliderID, setSelectedColliderID] = useSelectedColliderID();

    const isRestricted = selectedElem?.type === "util-room" || selectedElem?.type === "util-sound1" || selectedElem?.type === "util-sound2" || selectedElem?.type === "util-tele";

    const addCollider = () => {
        if (!selectedElem)
            return;
        if (selectedElem.properties.colliders === undefined)
            selectedElem.properties.colliders = [];

        const collider = {
            id: generateGUID(),
            blocksLight: !isRestricted,
            isSolid: isRestricted,
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
        <PanelContainer title={translation.Colliders}>
            <Menu style={{ backgroundColor: "revert" }}>
                <MenuItem2
                    icon="add"
                    text={translation.AddCollider}
                    disabled={selectedElem.type === "util-room" && selectedElem.properties.colliders && selectedElem.properties.colliders.length > 0}
                    onClick={addCollider} />

                {selectedElem.properties.colliders?.map((collider, index) => {
                    return (
                        <div key={collider.id + + "-" + index}>
                            <MenuItem2
                                icon="edit"
                                text={translation.Collider + " " + (index + 1)}
                                onClick={() => editCollider(collider)}
                                active={selectedColliderID === collider.id}
                                intent={collider.blocksLight ? "danger" : "success"}
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
