import { Button, InputGroup, Menu } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import generateGUID from "../../hooks/generateGUID";
import { useSelectedColliderID, useSetSelectedCollider } from "../../hooks/jotai/useSelectedCollider";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import useTranslation from "../../hooks/useTranslation";
import ColliderEditorPanel from "./ColliderEditorPanel";
import PanelContainer from "./PanelContainer";

const BLACKLISTED_TYPES = [
    "util-dummy",
    "util-triggerrepeat",
    "util-minimap",
    "util-layer"
];

const RESTRICTED_TYPES = [
    "util-room",
    "util-sound1",
    "util-sound2",
    "util-tele",
    "util-triggerarea",
    "util-triggersound",
];

export default function ColliderPanel() {
    const translation = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedColliderID, setSelectedColliderID] = useSelectedColliderID();
    const setSelectedCollider = useSetSelectedCollider();

    const isRestricted = RESTRICTED_TYPES.includes(selectedElem?.type || "");
    const disableAddCollider = selectedElem?.type === "util-room" && selectedElem.properties.colliders && selectedElem.properties.colliders.length > 0;

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

    if (!selectedElem || BLACKLISTED_TYPES.includes(selectedElem.type))
        return null;

    return (
        <PanelContainer title={translation.Colliders}>
            <Menu style={{ backgroundColor: "revert" }}>
                <Tooltip2
                    fill
                    content={"This object can only have 1 collider"}
                    disabled={!disableAddCollider}
                >
                    <MenuItem2
                        icon="add"
                        text={translation.AddCollider}
                        disabled={disableAddCollider}
                        onClick={addCollider} />

                </Tooltip2>

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
