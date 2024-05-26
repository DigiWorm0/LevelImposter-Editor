import { Box, MenuItem, Select } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import useElement from "../../../hooks/elements/useElements";
import { InputTriggerDB } from "../../../types/db/TriggerDB";
import LITrigger from "../../../types/li/LITrigger";
import DevInfo from "../../utils/DevInfo";
import ElementSelect from "../input/select/ElementSelect";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import useTriggerInputs from "../../../hooks/elements/triggers/useTriggerInputs";

interface TriggerEditorProps {
    triggerID: string;
    onFinished: () => void;
}

export default function TriggerEditorPanel(props: TriggerEditorProps) {
    const { t } = useTranslation();
    const [triggers, setTriggers] = useSelectedElemProp<LITrigger[]>("triggers");
    const inputableTargets = useTriggerInputs();

    const trigger = React.useMemo(() => {
        return triggers?.find(trigger => trigger.id === props.triggerID) ?? {
            id: props.triggerID,
            triggerID: undefined,
            elemID: undefined,
        };
    }, [triggers, props.triggerID]);

    // The target element that the trigger will be set to
    const [targetElem, setTargetElem] = useElement(trigger?.elemID);

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

    // Adds the trigger to the target if it doesn't exist
    React.useEffect(() => {
        if (!trigger.elemID || !trigger.triggerID || !targetElem)
            return;
        const hasTrigger = targetElem.properties.triggers?.some((t) => t.id === trigger.triggerID);
        if (hasTrigger)
            return;

        setTargetElem({
            ...targetElem,
            properties: {
                ...targetElem.properties,
                triggers: [
                    ...(targetElem.properties.triggers || []),
                    {
                        id: trigger.triggerID,
                        triggerID: undefined,
                        elemID: undefined,
                    }
                ]
            }
        });
    }, [trigger, targetElem, setTargetElem]);

    return (
        <Box sx={{ p: 1 }}>
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
            <Select
                size={"small"}
                fullWidth
                disabled={(targetInputs?.length ?? 0) === 0}
                value={trigger.triggerID || undefined}
                onChange={(e) => {
                    setTrigger({ ...trigger, triggerID: e.target.value });
                }}
            >
                <MenuItem value={undefined}>{t("trigger.selectTrigger")}</MenuItem>
                {targetInputs?.map((triggerID) => (
                    <MenuItem key={triggerID} value={triggerID}>
                        {t(`t.${triggerID}`)}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    )
}