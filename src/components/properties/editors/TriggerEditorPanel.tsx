import { Button, ControlGroup } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { atom, useAtomValue } from "jotai";
import React from "react";
import { useTranslation } from "react-i18next";
import useElement from "../../../hooks/jotai/useElements";
import { elementsAtom } from "../../../hooks/jotai/useMap";
import useSelectedElem, { selectedElementIDAtom } from "../../../hooks/jotai/useSelectedElem";
import { InputTriggerDB } from "../../../types/au/TriggerDB";
import LITrigger from "../../../types/li/LITrigger";
import DevInfo from "../../utils/DevInfo";
import ElementSelect from "../input/ElementSelect";

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
    const [targetElem, setTargetElem] = useElement(trigger?.elemID);

    // All Inputs that the selected element can trigger
    const targetInputs = React.useMemo(() => {
        if ((targetElem?.type ?? "") in InputTriggerDB)
            return InputTriggerDB[(targetElem?.type ?? "") as keyof typeof InputTriggerDB];
    }, [targetElem]);

    // Checks if a trigger is active
    const isTriggerSelected = React.useMemo(() => {
        return targetInputs?.includes(trigger.triggerID || "") ?? false;
    }, [targetInputs, trigger.triggerID]);

    // Sets the trigger target
    const setTrigger = React.useCallback((trigger: LITrigger) => {
        if (!selectedElem)
            return;

        const newTriggers = selectedElem.properties.triggers?.map((t) => {
            if (t.id === trigger.id)
                return trigger;
            return t;
        }) ?? [];
        if (!newTriggers.some((t) => t.id === trigger.id))
            newTriggers.push(trigger);

        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                triggers: newTriggers,
            }
        });
    }, [selectedElem, setSelectedElem]);

    // Adds the trigger to the target if it doesn't exist
    React.useEffect(() => {
        if (!trigger.elemID || !trigger.triggerID || !targetElem)
            return;
        const hasTrigger = targetElem.properties.triggers?.some((t) => t.id === trigger.id);
        if (hasTrigger)
            return;

        setTargetElem({
            ...targetElem,
            properties: {
                ...targetElem.properties,
                triggers: [
                    ...(targetElem.properties.triggers || []),
                    {
                        id: trigger.id,
                        triggerID: undefined,
                        elemID: undefined,
                    }
                ]
            }
        });
    }, [trigger, targetElem, setTargetElem]);

    const selectRenderer: ItemRenderer<string> = (triggerType, props) => (
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

            <ElementSelect
                whitelistedIDs={inputableTargets.map(elem => elem.id)}
                noElementsText={t("trigger.errorNoTargets")}
                defaultText={t("trigger.selectTarget")}
                selectedID={trigger.elemID}
                onPick={(elem) => {
                    console.log(elem);
                    setTrigger({ ...trigger, elemID: elem.id });
                }}
                onReset={() => {
                    setTrigger({
                        id: trigger.id,
                        triggerID: undefined,
                        elemID: undefined,
                    });
                }}
            />
            <ControlGroup fill style={{ marginTop: 5 }}>
                <Select2
                    fill
                    filterable={false}
                    items={targetInputs ?? []}
                    itemRenderer={selectRenderer}
                    disabled={!targetElem}
                    activeItem={trigger.triggerID}
                    onItemSelect={(triggerID) => {
                        setTrigger({ ...trigger, triggerID });
                    }}
                >
                    <Button
                        icon={isTriggerSelected && "send-message"}
                        rightIcon="caret-down"
                        text={isTriggerSelected ?
                            t(`t.${trigger.triggerID}`) :
                            t("trigger.selectTrigger")}
                        disabled={!targetElem}
                        fill
                    />
                </Select2>
            </ControlGroup>
        </div>
    )
}