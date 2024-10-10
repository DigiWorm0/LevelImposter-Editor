import {Box, MenuItem, Select} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import {useElementValue} from "../../../hooks/elements/useElements";
import {InputTriggerDB} from "../../../db/TriggerDB";
import LITrigger from "../../../types/li/LITrigger";
import ElementSelect from "../input/select/ElementSelect";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import useTriggerInputs from "../../../hooks/elements/triggers/useTriggerInputs";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import {Timer} from "@mui/icons-material";

interface TriggerEditorProps {
    triggerID: string;
    onFinished: () => void;
}

export default function TriggerEditorPanel(props: TriggerEditorProps) {
    const {t} = useTranslation();
    const [triggers, setTriggers] = useSelectedElemProp("triggers");
    const inputableTargets = useTriggerInputs();

    // The trigger that is being edited
    const trigger = React.useMemo(() => {
        return triggers?.find(trigger => trigger.id === props.triggerID) ?? {
            id: props.triggerID,
            triggerID: undefined,
            elemID: undefined,
        };
    }, [triggers, props.triggerID]);

    // The target element that the trigger will be set to
    const targetElem = useElementValue(trigger?.elemID);

    // All Inputs that the selected element can trigger
    const targetInputs = React.useMemo(() => {
        if ((targetElem?.type ?? "") in InputTriggerDB)
            return InputTriggerDB[(targetElem?.type ?? "") as keyof typeof InputTriggerDB];
    }, [targetElem]);

    // Sets the trigger target
    const setTrigger = React.useCallback((trigger: LITrigger) => {
        const newTriggers = triggers?.map((t) => {
            if (t.id === trigger.id)
                return trigger;
            return t;
        }) ?? [];

        if (!newTriggers.some((t) => t.id === trigger.id))
            newTriggers.push(trigger);

        setTriggers(newTriggers);
    }, [triggers, setTriggers]);

    return (
        <Box sx={{p: 1}}>
            <ElementSelect
                whitelistedIDs={inputableTargets.map(elem => elem.id)}
                noElementsText={t("trigger.errorNoTargets")}
                defaultText={t("trigger.selectTarget")}
                selectedID={trigger.elemID}
                onPick={(elem) => {
                    setTrigger({...trigger, elemID: elem.id, triggerID: undefined});
                }}
                onReset={() => {
                    setTrigger({
                        id: trigger.id,
                        triggerID: undefined,
                        elemID: undefined,
                    });
                }}
            />
            <Select
                variant={"outlined"}
                size={"small"}
                fullWidth
                disabled={(targetInputs?.length ?? 0) === 0}
                value={trigger.triggerID || ""}
                onChange={(e) => {
                    setTrigger({...trigger, triggerID: e.target.value});
                }}
            >
                <MenuItem value={""}>{t("trigger.selectTrigger")}</MenuItem>
                {targetInputs?.map((triggerID) => (
                    <MenuItem key={triggerID} value={triggerID}>
                        {t(`t.${triggerID}`)}
                    </MenuItem>
                ))}
            </Select>
            {(trigger.triggerID === "show" || trigger.triggerID === "hide") && (
                <ElementPropNumericInput
                    name={"Fade Duration"}
                    prop={"triggerFadeTime"}
                    defaultValue={0}
                    icon={<Timer/>}
                    label={"ms"}
                />
            )}
        </Box>
    );
}