import React from "react";
import { useTranslation } from "react-i18next";
import { useElementIDs } from "../../../hooks/jotai/useMap";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import { useSelectedTriggerID } from "../../../hooks/jotai/useSelectedTrigger";
import { OutputTriggerDB } from "../../../types/au/TriggerDB";
import SwitchPanelInput from "../input/SwitchPanelInput";
import TriggerEditorPanel from "../editors/TriggerEditorPanel";
import DropdownList from "../util/DropdownList";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";

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
                <DropdownList
                    elements={triggerOutputs.map((triggerID) => ({
                        id: triggerID,
                        name: t(`t.${triggerID}`),
                        intent: isTriggerActive(triggerID) ? "success" : "danger",
                        icon: "antenna"
                    }))}
                    selectedID={selectedTriggerID}
                    onSelectID={setSelectedTriggerID}
                >
                    <TriggerEditorPanel />
                </DropdownList>

                {CLIENT_SIDE_TYPES.includes(selectedElem.type) && (
                    <SwitchPanelInput
                        name="trigger.isClientSide"
                        prop="triggerClientSide"
                        defaultValue={true}
                    />
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
