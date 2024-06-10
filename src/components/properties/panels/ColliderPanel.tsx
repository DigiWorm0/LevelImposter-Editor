import { Add, CameraAlt, HighlightAlt, Person, Room, VolumeUp } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelectedColliderID } from "../../../hooks/elements/colliders/useSelectedCollider";
import generateGUID from "../../../utils/strings/generateGUID";
import ColliderEditorPanel from "../editors/ColliderEditorPanel";
import DropdownList from "../util/DropdownList";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import useSelectedElemType from "../../../hooks/elements/useSelectedElemType";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";

const BLACKLISTED_TYPES = [
    "util-dummy",
    "util-meeting",
    "util-triggerrepeat",
    "util-triggertimer",
    "util-triggerstart",
    "util-triggerrand",
    "util-minimap",
    "util-minimapsprite",
    "util-layer",
    "util-spawn1",
    "util-spawn2",
    "util-sabotages",
];

const SOLID_ONLY_TYPES = [
    "util-room",
    "util-sound1",
    "util-sound2",
    "util-tele",
    "util-triggerarea",
    "util-triggersound",
    "util-triggerdeath",
    "util-triggershake",
    "util-decontamination"
];

const SHADOW_ONLY_TYPES = [
    "util-onewaycollider"
];

const EDGE_ONLY_TYPES = [
    "util-binocularscollider",
    "util-ghostcollider",
];

const SINGULAR_TYPES = [
    "util-room",
    "util-sound2",
    "util-decontamination"
];

export default function ColliderPanel() {
    const { t } = useTranslation();
    const type = useSelectedElemType();
    const [_colliders, setColliders] = useSelectedElemProp("colliders");
    const [selectedColliderID, setSelectedColliderID] = useSelectedColliderID();

    const colliders = _colliders ?? [];
    const isSolidOnly = SOLID_ONLY_TYPES.includes(type || "");
    const isShadowOnly = SHADOW_ONLY_TYPES.includes(type || "");
    const isEdgeOnly = EDGE_ONLY_TYPES.includes(type || "");
    const isAddDisabled = type !== undefined && SINGULAR_TYPES.includes(type) && colliders.length > 0;

    const addCollider = React.useCallback(() => {
        const collider = {
            id: generateGUID(),
            blocksLight: !isSolidOnly && !isEdgeOnly,
            isSolid: isSolidOnly && !isEdgeOnly,
            points: [
                { x: -0.5, y: 0.5 },
                { x: -0.5, y: -0.5 },
                { x: 0.5, y: -0.5 },
                { x: 0.5, y: 0.5 },
            ]
        };

        setColliders([...(colliders ?? []), collider]);
        setSelectedColliderID(collider?.id);
    }, [colliders, isSolidOnly, isEdgeOnly, setColliders, setSelectedColliderID]);

    if (!type || BLACKLISTED_TYPES.includes(type))
        return null;

    return (
        <>
            <PanelContainer title={t("collider.title") as string}>
                <Button
                    size={"small"}
                    fullWidth
                    endIcon={<Add />}
                    onClick={addCollider}
                    disabled={isAddDisabled}
                    color={"inherit"}
                    style={{ marginTop: 5, marginBottom: 0 }}
                >
                    {t("collider.add") as string}
                </Button>
                <DropdownList
                    elements={colliders.map((collider, index) => ({
                        id: collider.id,
                        name: collider.name !== undefined ? collider.name : t("collider.defaultName", { index: index + 1 }) as string,
                        intent: collider.blocksLight ? "error" : "success",
                        icon: "Edit"
                    })) ?? []}
                    selectedID={selectedColliderID}
                    onSelectID={setSelectedColliderID}
                    renderElement={(element) => (
                        <ColliderEditorPanel
                            key={element.id}
                            colliderID={element.id}
                            setSelectedColliderID={setSelectedColliderID}
                            isSolidOnly={isSolidOnly}
                            isShadowOnly={isShadowOnly}
                            isEdgeOnly={isEdgeOnly}
                        />
                    )}
                />

            </PanelContainer>

            <MapError
                isVisible={selectedColliderID !== undefined}
                info
                icon={<HighlightAlt />}
            >
                {t("collider.colliderInfo") as string}
            </MapError>
            <MapError
                isVisible={type.startsWith("sab-door")}
                info
                icon={<HighlightAlt />}
            >
                {t("collider.doorInfo") as string}
            </MapError>
            <MapError
                isVisible={type === "util-room"}
                info
                icon={<Room />}
            >
                {t("collider.roomInfo") as string}
            </MapError>
            <MapError
                isVisible={type.startsWith("util-sound") || type === "util-triggersound"}
                info
                icon={<VolumeUp />}
            >
                {t("collider.soundInfo") as string}
            </MapError>
            <MapError
                isVisible={type === "util-triggerarea"}
                info
                icon={<HighlightAlt />}
            >
                {t("collider.triggerAreaInfo") as string}
            </MapError>
            <MapError
                isVisible={type === "util-tele"}
                info
                icon={<HighlightAlt />}
            >
                {t("collider.teleInfo") as string}
            </MapError>
            <MapError
                isVisible={type === "util-onewaycollider"}
                info
                icon={<HighlightAlt />}
            >
                {t("collider.oneWayColliderInfo") as string}
            </MapError>
            <MapError
                isVisible={type === "util-decontamination"}
                info
                icon={<VolumeUp />}
            >
                {t("collider.soundInfo") as string}
            </MapError>
            <MapError
                isVisible={type === "util-ghostcollider"}
                info
                icon={<Person />}
            >
                {t("collider.ghostInfo") as string}
            </MapError>
            <MapError
                isVisible={type === "util-binocularscollider"}
                info
                icon={<CameraAlt />}
            >
                {t("collider.binocularsInfo") as string}
            </MapError>
            <MapError
                isVisible={type === "util-triggerdeath"}
                info
                icon={<HighlightAlt />}
            >
                {t("collider.deathInfo") as string}
            </MapError>
            <MapError
                isVisible={type === "util-triggershake"}
                info
                icon={<CameraAlt />}
            >
                {t("collider.shakeInfo") as string}
            </MapError>
        </>
    );
}
