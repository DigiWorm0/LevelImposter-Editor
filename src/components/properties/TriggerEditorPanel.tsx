import { Button, Card, ControlGroup, Switch } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { atom, useAtomValue } from "jotai";
import React from "react";
import { useTranslation } from "react-i18next";
import useElement from "../../hooks/jotai/useElements";
import { elementsAtom } from "../../hooks/jotai/useMap";
import { selectedElementIDAtom, useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import useSelectedTrigger, { useSelectedTriggerIDValue } from "../../hooks/jotai/useSelectedTrigger";
import { InputTriggerDB } from "../../types/au/TriggerDB";
import LIElement from "../../types/li/LIElement";
import LITrigger from "../../types/li/LITrigger";
import DevInfo from "../DevInfo";

const ElemSelect = Select2.ofType<LIElement>();
const TriggerSelect = Select2.ofType<string>();

const triggerInputsAtom = atom((get) => {
    const elements = get(elementsAtom);
    const selectedElemID = get(selectedElementIDAtom);
    return elements.filter((elem) => elem.type in InputTriggerDB && elem.id !== selectedElemID);
});

export default function TriggerEditorPanel() {
    const { t } = useTranslation();
    const selectedElem = useSelectedElemValue();
    const selectedTriggerID = useSelectedTriggerIDValue();
    const [selectedTrigger, setSelectedTrigger] = useSelectedTrigger();
    const inputableTargets = useAtomValue(triggerInputsAtom);
    const [triggerTarget, setTriggerTarget] = useElement(selectedTrigger?.elemID);

    const targetInputs = triggerTarget && triggerTarget.type in InputTriggerDB ? InputTriggerDB[triggerTarget.type] : [];
    const selectedTriggerDef: LITrigger = selectedTrigger || {
        id: selectedTriggerID || "",
        triggerID: undefined,
        elemID: undefined,
    }
    const isTriggerSelected = targetInputs.includes(selectedTriggerDef.triggerID || "");

    React.useEffect(() => {
        if (selectedTriggerDef.elemID && selectedTriggerDef.triggerID && triggerTarget) {
            const triggerID = selectedTriggerDef.triggerID;
            const hasTrigger = triggerTarget.properties.triggers?.some((trigger) => trigger.id === triggerID);
            if (!hasTrigger) {
                setTriggerTarget({
                    ...triggerTarget,
                    properties: {
                        ...triggerTarget.properties,
                        triggers: [
                            ...(triggerTarget.properties.triggers || []),
                            {
                                id: triggerID,
                                triggerID: undefined,
                                elemID: undefined,
                            }
                        ]
                    }
                });
            }
        }
    }, [selectedTriggerDef.elemID, selectedTriggerDef.triggerID]);

    const elemSelectRenderer: ItemRenderer<LIElement> = (elem, props) => (
        <MenuItem2
            key={elem.type + props.index}
            text={elem.name}
            label={elem.type}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    const triggerSelectRenderer: ItemRenderer<string> = (triggerType, props) => (
        <MenuItem2
            icon={"send-message"}
            key={triggerType + props.index}
            text={t(`t.${triggerType}`)}
            label={triggerType}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    if (!selectedElem)
        return null;

    return (
        <Card style={{ boxShadow: "none", padding: 10 }}>

            <DevInfo>
                {selectedTriggerDef.id} <br />
                {selectedTriggerDef.triggerID} <br />
                {selectedTriggerDef.elemID}
            </DevInfo>

            <ControlGroup fill>
                <ElemSelect
                    fill
                    filterable={false}
                    items={inputableTargets}
                    itemRenderer={elemSelectRenderer}
                    activeItem={triggerTarget}
                    onItemSelect={(elem) => {
                        setSelectedTrigger({ ...selectedTriggerDef, elemID: elem.id });
                    }}>

                    <Button
                        rightIcon="caret-down"
                        disabled={inputableTargets.length === 0}
                        text={triggerTarget?.name ?? t("trigger.selectTarget")}
                        fill
                    />
                </ElemSelect>
                <Button
                    minimal
                    rightIcon="cross"
                    onClick={() => {
                        setSelectedTrigger({ ...selectedTriggerDef, elemID: undefined });
                    }}
                />
            </ControlGroup>
            <ControlGroup fill style={{ marginTop: 10 }}>
                <TriggerSelect
                    fill
                    filterable={false}
                    items={targetInputs}
                    itemRenderer={triggerSelectRenderer}
                    disabled={!triggerTarget}
                    activeItem={selectedTriggerDef.triggerID}
                    onItemSelect={(triggerID) => {
                        setSelectedTrigger({ ...selectedTriggerDef, triggerID });
                    }}>

                    <Button
                        icon={isTriggerSelected && "send-message"}
                        rightIcon="caret-down"
                        text={isTriggerSelected ?
                            t(`t.${selectedTriggerDef.triggerID}`) :
                            t("trigger.selectTrigger")}
                        disabled={!triggerTarget}
                        fill
                    />

                </TriggerSelect>
            </ControlGroup>
        </Card>
    )
}