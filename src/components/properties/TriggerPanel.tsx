import React from "react";
import { ControlGroup, Menu, Switch } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import { useElementIDs } from "../../hooks/jotai/useMap";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useSelectedTriggerID } from "../../hooks/jotai/useSelectedTrigger";
import { OutputTriggerDB } from "../../types/au/TriggerDB";
import MapError from "./util/MapError";
import PanelContainer from "./util/PanelContainer";
import TriggerEditorPanel from "./TriggerEditorPanel";

const CLIENT_SIDE_TYPES = [
    "util-triggerarea",
    "util-triggerconsole",
];

export default function TriggerPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedTriggerID, setSelectedTriggerID] = useSelectedTriggerID();
    const elementIDs = useElementIDs();

    const triggerOutputs = React.useMemo(() => {
        if (!selectedElem || !(selectedElem.type in OutputTriggerDB))
            return [];
        return OutputTriggerDB[selectedElem.type];
    }, [selectedElem]);

    const isTriggerable = React.useMemo(() => triggerOutputs.length > 0, [triggerOutputs]);

    const hasCollider = React.useMemo(() => {
        return selectedElem?.properties?.colliders !== undefined && selectedElem?.properties?.colliders.length > 0;
    }, [selectedElem]);

    const isTriggerActive = React.useCallback((triggerID: string) => {
        const triggerObj = selectedElem?.properties?.triggers?.find((trigger) => trigger.id === triggerID);
        return triggerObj !== undefined && triggerObj.elemID !== undefined && triggerObj.triggerID !== undefined && elementIDs.includes(triggerObj.elemID);
    }, [selectedElem, elementIDs]);

    if (!selectedElem || !isTriggerable)
        return null;

    return (
        <>
            <PanelContainer title={"Trigger"}>
                <Menu style={{ backgroundColor: "revert" }}>
                    {triggerOutputs.map((triggerID) => (
                        <div key={selectedElem.id + triggerID}>
                            <MenuItem2
                                icon={"antenna"}
                                text={t(`t.${triggerID}`)}
                                onClick={() => setSelectedTriggerID(selectedTriggerID === triggerID ? undefined : triggerID)}
                                active={selectedTriggerID === triggerID}
                                intent={isTriggerActive(triggerID) ? "success" : "danger"}
                            />
                            {selectedTriggerID === triggerID && <TriggerEditorPanel />}
                        </div>
                    ))}
                </Menu>
                {CLIENT_SIDE_TYPES.includes(selectedElem.type) && (
                    <ControlGroup fill style={{ textAlign: "center" }}>
                        <Switch
                            label={t("trigger.isClientSide") as string}
                            checked={selectedElem.properties.triggerClientSide !== false}
                            onChange={(e) => {
                                setSelectedElem({
                                    ...selectedElem,
                                    properties: {
                                        ...selectedElem.properties,
                                        triggerClientSide: e.currentTarget.checked,
                                    },
                                });
                            }}
                        />
                    </ControlGroup>
                )}
            </PanelContainer>

            <MapError isVisible={selectedElem.type === "util-triggerrand"} info>
                {t("trigger.randomInfo")}
            </MapError>
            <MapError isVisible={selectedElem.type === "util-triggerrepeat"} info>
                {t("trigger.repeatInfo")}
            </MapError>
            <MapError isVisible={!hasCollider && selectedElem.type === "util-triggerarea"}>
                {t("trigger.errorNoCollider")}
            </MapError>
        </>
    );
}
