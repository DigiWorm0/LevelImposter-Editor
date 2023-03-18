import React from "react";
import { Button, ControlGroup } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { atom, useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";
import useElement from "../../../hooks/jotai/useElements";
import { elementsAtom } from "../../../hooks/jotai/useMap";
import useSelectedElem, { selectedElementIDAtom, useSetSelectedElem } from "../../../hooks/jotai/useSelectedElem";
import { InputTriggerDB } from "../../../types/au/TriggerDB";
import LIElement from "../../../types/li/LIElement";
import DevInfo from "../../utils/DevInfo";
import ResettablePanelInput from "../input/ResettablePanelInput";
import LITrigger from "../../../types/li/LITrigger";

const triggerInputsAtom = atom((get) => {
    const elements = get(elementsAtom);
    const selectedElemID = get(selectedElementIDAtom);
    return elements.filter((elem) => elem.type in InputTriggerDB && elem.id !== selectedElemID);
});

interface TriggerEditorProps {
    triggerID: string;
    onFinished: () => void;
}

export default function TriggerEditorPanel(props: TriggerEditorProps) {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const inputableTargets = useAtomValue(triggerInputsAtom);
    const trigger = React.useMemo(() => {
        return selectedElem?.properties.triggers?.find(trigger => trigger.id === props.triggerID) || {
            id: props.triggerID,
            triggerID: undefined,
            elemID: undefined,
        };
    }, [selectedElem, props.triggerID]);
    const [triggerTarget, setTriggerTarget] = useElement(trigger?.elemID);

    const targetInputs = React.useMemo(() => {
        return triggerTarget && triggerTarget.type in InputTriggerDB ? InputTriggerDB[triggerTarget.type] : [];
    }, [triggerTarget]);

    const isTriggerSelected = React.useMemo(() => {
        return targetInputs.includes(trigger.triggerID || "");
    }, [targetInputs, trigger.triggerID]);

    const setTrigger = React.useCallback((trigger: LITrigger) => {
        if (!selectedElem)
            return;

        const newTriggers = selectedElem.properties.triggers?.map((t) => {
            if (t.id === trigger.id)
                return trigger;
            return t;
        }) || [];

        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                triggers: newTriggers,
            }
        });
    }, [selectedElem, setSelectedElem]);

    React.useEffect(() => {
        if (trigger.elemID && trigger.triggerID && triggerTarget) {
            const hasTrigger = triggerTarget.properties.triggers?.some((t) => t.id === trigger.id);
            if (!hasTrigger) {
                setTriggerTarget({
                    ...triggerTarget,
                    properties: {
                        ...triggerTarget.properties,
                        triggers: [
                            ...(triggerTarget.properties.triggers || []),
                            {
                                id: trigger.id,
                                triggerID: undefined,
                                elemID: undefined,
                            }
                        ]
                    }
                });
            }
        }
    }, [trigger, triggerTarget, setTriggerTarget]);

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
        <div style={{ padding: 20 }}>
            <DevInfo>
                {trigger.id}
                {trigger.elemID}
                {trigger.triggerID}
            </DevInfo>

            <ResettablePanelInput
                onReset={() => {
                    setTrigger({
                        id: trigger.id,
                        triggerID: undefined,
                        elemID: undefined,
                    });
                }}
            >

                <Select2
                    fill
                    filterable={false}
                    items={inputableTargets}
                    itemRenderer={elemSelectRenderer}
                    activeItem={triggerTarget}
                    onItemSelect={(elem) => {
                        setTrigger({ ...trigger, elemID: elem.id });
                    }}>

                    <Button
                        rightIcon="caret-down"
                        disabled={inputableTargets.length === 0}
                        text={triggerTarget?.name ?? t("trigger.selectTarget")}
                        fill
                    />
                </Select2>
            </ResettablePanelInput>
            <ControlGroup fill style={{ marginTop: 5 }}>
                <Select2
                    fill
                    filterable={false}
                    items={targetInputs}
                    itemRenderer={triggerSelectRenderer}
                    disabled={!triggerTarget}
                    activeItem={trigger.triggerID}
                    onItemSelect={(triggerID) => {
                        setTrigger({ ...trigger, triggerID });
                    }}>

                    <Button
                        icon={isTriggerSelected && "send-message"}
                        rightIcon="caret-down"
                        text={isTriggerSelected ?
                            t(`t.${trigger.triggerID}`) :
                            t("trigger.selectTrigger")}
                        disabled={!triggerTarget}
                        fill
                    />

                </Select2>
            </ControlGroup>
        </div>
    )
}