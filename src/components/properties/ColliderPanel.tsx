import React from "react";
import { Button, InputGroup, Menu } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import generateGUID from "../../hooks/generateGUID";
import { useSelectedColliderID, useSetSelectedCollider } from "../../hooks/jotai/useSelectedCollider";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import useTranslation from "../../hooks/useTranslation";
import LICollider from "../../types/li/LICollider";
import ColliderEditorPanel from "./ColliderEditorPanel";
import PanelContainer from "./PanelContainer";

const TYPE_BLACKLIST = [
    "util-dummy",
    "util-triggerrepeat",
    "util-minimap",
    "util-layer"
];

export default function ColliderPanel() {
    const translation = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedColliderID, setSelectedColliderID] = useSelectedColliderID();
    const setSelectedCollider = useSetSelectedCollider();

    const isRestricted = selectedElem?.type === "util-room" || selectedElem?.type === "util-sound1" || selectedElem?.type === "util-sound2" || selectedElem?.type === "util-tele" || selectedElem?.type === "util-triggerarea";

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

    if (!selectedElem || TYPE_BLACKLIST.includes(selectedElem.type))
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
                    const colliderName = collider.name !== undefined ? collider.name : translation.Collider + " " + (index + 1);
                    const intent = collider.blocksLight ? "danger" : "success";

                    return (
                        <div key={collider.id + + "-" + index}>
                            <MenuItem2
                                icon={selectedColliderID === collider.id ? (
                                    <Button
                                        intent={intent}
                                        small
                                        minimal
                                        icon="tick"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedColliderID(undefined);
                                        }}
                                    />
                                ) : (
                                    "edit"
                                )}
                                text={selectedColliderID === collider.id ? (
                                    <InputGroup
                                        small
                                        intent={intent}
                                        value={colliderName}
                                        maxLength={20}
                                        onClick={(e) => e.stopPropagation()}
                                        onFocus={(e) => e.target.select()}
                                        onChange={(e) => {
                                            setSelectedCollider({
                                                ...collider,
                                                name: e.target.value
                                            });
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                setSelectedColliderID(undefined);
                                            }
                                        }}
                                    />
                                ) : (
                                    colliderName
                                )}
                                onClick={() => setSelectedColliderID(collider.id)}
                                active={selectedColliderID === collider.id}
                                intent={intent}
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
