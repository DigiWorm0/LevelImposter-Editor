import React from "react";
import { useTranslation } from "react-i18next";
import { useSelectedElemValue } from "../../../hooks/elements/useSelectedElem";
import { useSelectedTriggerID } from "../../../hooks/elements/useSelectedTrigger";
import { useElementIDs } from "../../../hooks/map/useMap";
import { OutputTriggerDB } from "../../../types/db/TriggerDB";
import TriggerEditorPanel from "../editors/TriggerEditorPanel";
import DropdownList from "../util/DropdownList";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import ElementPropSwitch from "../input/elementProps/ElementPropSwitch";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";

const CLIENT_SIDE_TYPES = [
    "util-triggerarea",
    "util-triggerconsole",
];

const GHOST_TYPES = [
    "util-triggerarea",
];

export default function TriggerPanel() {
    const { t } = useTranslation();
    const selectedElem = useSelectedElemValue();
    const [selectedTriggerID, setSelectedTriggerID] = useSelectedTriggerID();
    const elementIDs = useElementIDs();

    // All Outputs that the selected element can trigger
    const triggerOutputs = React.useMemo(() => {
        if ((selectedElem?.type ?? "") in OutputTriggerDB)
            return OutputTriggerDB[(selectedElem?.type ?? "") as keyof typeof OutputTriggerDB];
        if (selectedElem?.type == "util-triggerrand")
            return Array.from({ length: selectedElem.properties.triggerCount ?? 2 }, (_, i) => `onRandom ${i + 1}`);
    }, [selectedElem]);

    // If the selected element has a collider
    const hasCollider = React.useMemo(() => {
        return (selectedElem?.properties?.colliders?.length ?? 0) > 0;
    }, [selectedElem]);

    // Checks if a trigger is active
    const isTriggerActive = React.useCallback((triggerID: string) => {
        const triggerObj = selectedElem?.properties?.triggers?.find((trigger) => trigger.id === triggerID);
        return triggerObj
            && triggerObj.elemID
            && triggerObj.triggerID
            && elementIDs.includes(triggerObj.elemID);
    }, [selectedElem, elementIDs]);

    // Gets random percentage
    const randomPercentage = React.useMemo(() => {
        if (selectedElem?.type !== "util-triggerrand")
            return undefined;
        const triggerCount = selectedElem.properties.triggerCount ?? 2;
        const percentage = Math.round(1 / triggerCount * 100);
        return `${percentage}%`;
    }, [selectedElem]);

    if (!selectedElem || triggerOutputs === undefined)
        return null;

    return (
        <>
            <PanelContainer title={"Trigger"}>
                {selectedElem.type === "util-triggerrand" && (
                    <ElementPropNumericInput
                        name={t("trigger.count")}
                        prop="triggerCount"
                        label={randomPercentage}
                        defaultValue={2}
                        icon="SettingsInputAntenna"
                        min={2}
                        stepSize={1}
                    />
                )}
                <DropdownList
                    elements={triggerOutputs.map((triggerID) => {
                        const split = triggerID.split(" ");
                        return {
                            id: triggerID,
                            name: t(`t.${split[0]}`, { index: split[1] ?? 1 }),
                            intent: isTriggerActive(triggerID) ? "success" : "error",
                            icon: "SettingsInputAntenna"
                        };
                    })}
                    selectedID={selectedTriggerID}
                    onSelectID={setSelectedTriggerID}
                    renderElement={(e) => (
                        <TriggerEditorPanel
                            triggerID={e.id}
                            onFinished={() => setSelectedTriggerID(undefined)}
                        />
                    )}
                />

                {CLIENT_SIDE_TYPES.includes(selectedElem.type) && (
                    <ElementPropSwitch
                        name={t("trigger.isClientSide")}
                        prop="triggerClientSide"
                        defaultValue={true}
                    />
                )}
                {GHOST_TYPES.includes(selectedElem.type) && (
                    <ElementPropSwitch
                        name={t("trigger.isGhostEnabled")}
                        prop="isGhostEnabled"
                        defaultValue={false}
                    />
                )}
            </PanelContainer>

            <MapError
                isVisible={selectedElem.type === "util-triggerrand"}
                info
                icon="Shuffle"
            >
                {t("trigger.randomInfo")}
            </MapError>
            <MapError
                isVisible={selectedElem.type === "util-triggerrepeat"}
                info
                icon="SettingsInputAntenna"
            >
                {t("trigger.repeatInfo")}
            </MapError>
            <MapError
                isVisible={!hasCollider && selectedElem.type === "util-triggerarea"}
                icon="HighlightAlt"
            >
                {t("trigger.errorNoCollider")}
            </MapError>
        </>
    );
}
