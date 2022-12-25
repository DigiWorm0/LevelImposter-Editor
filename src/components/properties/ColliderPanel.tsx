import { Button, InputGroup, Menu } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import generateGUID from "../../hooks/generateGUID";
import { useSelectedColliderID, useSetSelectedCollider } from "../../hooks/jotai/useSelectedCollider";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import ColliderEditorPanel from "./ColliderEditorPanel";
import MapError from "./MapError";
import PanelContainer from "./PanelContainer";

const BLACKLISTED_TYPES = [
    "util-dummy",
    "util-triggerrepeat",
    "util-triggertimer",
    "util-triggerstart",
    "util-minimap",
    "util-layer",
    "util-spawn1",
    "util-spawn2"
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
    const { t } = useTranslation();
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
        <>
            <PanelContainer title={t("collider.title") as string}>
                <Menu style={{ backgroundColor: "revert" }}>
                    <Tooltip2
                        fill
                        content={t("collider.errorOneOnly") as string}
                        disabled={!disableAddCollider}
                    >
                        <MenuItem2
                            icon="add"
                            text={t("collider.add") as string}
                            disabled={disableAddCollider}
                            onClick={addCollider} />

                    </Tooltip2>

                    {selectedElem.properties.colliders?.map((collider, index) => {
                        const colliderName = collider.name !== undefined ? collider.name : t("collider.defaultName", { index: index + 1 }) as string;
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

            <MapError isVisible={selectedElem.type.startsWith("sab-door")} info>
                {t("collider.doorInfo") as string}
            </MapError>
            <MapError isVisible={selectedElem.type === "util-room"} info>
                {t("collider.roomInfo") as string}
            </MapError>
            <MapError isVisible={selectedElem.type.startsWith("util-sound") || selectedElem.type === "util-triggersound"} info>
                {t("collider.soundInfo") as string}
            </MapError>
            <MapError isVisible={selectedElem.type === "util-triggerarea"} info>
                {t("collider.triggerAreaInfo") as string}
            </MapError>
            <MapError isVisible={selectedElem.type === "util-tele"} info>
                {t("collider.teleInfo") as string}
            </MapError>
        </>
    );
}
