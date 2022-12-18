import { Menu } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { useTranslation } from "react-i18next";
import { useElementIDs } from "../../hooks/jotai/useMap";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import { useSelectedTriggerID } from "../../hooks/jotai/useSelectedTrigger";
import { OutputTriggerDB } from "../../types/au/TriggerDB";
import MapError from "./MapError";
import PanelContainer from "./PanelContainer";
import TriggerEditorPanel from "./TriggerEditorPanel";


export default function TriggerPanel() {
    const { t } = useTranslation();
    const selectedElem = useSelectedElemValue();
    const [selectedTriggerID, setSelectedTriggerID] = useSelectedTriggerID();
    const elementIDs = useElementIDs();

    const triggerOutputs = (selectedElem && selectedElem.type in OutputTriggerDB) ? OutputTriggerDB[selectedElem.type] : [];
    const isTriggerable = triggerOutputs.length > 0;

    const isTriggerActive = (triggerID: string) => {
        const triggerObj = selectedElem?.properties?.triggers?.find((trigger) => trigger.id === triggerID);
        return triggerObj !== undefined && triggerObj.elemID !== undefined && triggerObj.triggerID !== undefined && elementIDs.includes(triggerObj.elemID);
    };

    if (!selectedElem || !isTriggerable)
        return null;

    const hasCollider = selectedElem.properties.colliders !== undefined && selectedElem.properties.colliders.length > 0;

    return (
        <>
            <PanelContainer title={"Trigger"}>
                <Menu style={{ backgroundColor: "revert" }}>
                    {triggerOutputs.map((triggerID) => (
                        <div key={selectedElem.id + triggerID}>
                            <MenuItem2
                                icon={"antenna"}
                                text={triggerID}
                                onClick={() => setSelectedTriggerID(selectedTriggerID === triggerID ? undefined : triggerID)}
                                active={selectedTriggerID === triggerID}
                                intent={isTriggerActive(triggerID) ? "success" : "danger"}
                            />
                            {selectedTriggerID === triggerID && <TriggerEditorPanel />}
                        </div>
                    ))}
                </Menu>
            </PanelContainer>

            <MapError isVisible={!hasCollider && selectedElem.type === "util-triggerarea"}>
                {t("trigger.errorNoCollider")}
            </MapError>
        </>
    );
}
