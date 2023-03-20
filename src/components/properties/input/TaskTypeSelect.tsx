import React from "react";
import { Button, FormGroup } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import { AUTaskLengthDB, TaskLength } from "../../../types/generic/TaskLength";
import ResettablePanelInput from "./ResettablePanelInput";

export default function TaskTypeSelect() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const defaultTaskLength = React.useMemo(() => {
        if ((selectedElem?.type ?? "") in AUTaskLengthDB)
            return AUTaskLengthDB[(selectedElem?.type ?? "") as keyof typeof AUTaskLengthDB];
    }, [selectedElem]);

    const selectRenderer: ItemRenderer<string> = (length, props) => (
        <MenuItem2
            key={props.index + "-length"}
            text={t(`task.${length}`) as string}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    if (!selectedElem)
        return null;

    return (
        <FormGroup
            style={{
                marginBottom: 5,
                marginTop: 5
            }}
        >
            <ResettablePanelInput
                onReset={() => {
                    setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, taskLength: undefined } });
                }}
            >
                <Select2
                    fill
                    filterable={false}
                    items={Object.values(TaskLength)}
                    itemRenderer={selectRenderer}
                    onItemSelect={(length) => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, taskLength: length } });
                    }}
                >
                    <Button
                        rightIcon="caret-down"
                        text={t(`task.${selectedElem.properties.taskLength ?? defaultTaskLength ?? 'defaultLength'}`) as string}
                        style={{
                            fontStyle: selectedElem.properties.taskLength ? "normal" : "italic"
                        }}
                        fill
                    />
                </Select2>
            </ResettablePanelInput>
        </FormGroup>
    )
}