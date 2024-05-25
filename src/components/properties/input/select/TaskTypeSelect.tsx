import { Autocomplete, Box, TextField } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../../hooks/elements/useSelectedElem";
import { AUTaskLengthDB, TaskLength } from "../../../../types/generic/TaskLength";

export default function TaskTypeSelect() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const defaultTaskLength = React.useMemo(() => {
        if ((selectedElem?.type ?? "") in AUTaskLengthDB)
            return AUTaskLengthDB[(selectedElem?.type ?? "") as keyof typeof AUTaskLengthDB];
    }, [selectedElem]);

    const onReset = React.useCallback(() => {
        if (!selectedElem)
            return;

        setSelectedElem({
            ...selectedElem,
            properties: { ...selectedElem.properties, taskLength: undefined }
        });
    }, [selectedElem, setSelectedElem]);

    const onChange = React.useCallback((taskLength: TaskLength) => {
        if (!selectedElem)
            return;

        setSelectedElem({
            ...selectedElem,
            properties: { ...selectedElem.properties, taskLength }
        });
    }, [selectedElem, setSelectedElem]);

    if (!selectedElem)
        return null;

    return (
        <Box
            style={{
                marginBottom: 5,
                marginTop: 5
            }}
        >
            <Autocomplete
                value={selectedElem.properties.taskLength ?? defaultTaskLength}
                options={Object.values(TaskLength)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={t(`task.length`)}
                        fullWidth
                        size={"small"}
                    />
                )}
                onChange={(_, taskLength) => {
                    if (taskLength)
                        onChange(taskLength as TaskLength);
                    else
                        onReset();
                }}
            />
        </Box>
    )
}