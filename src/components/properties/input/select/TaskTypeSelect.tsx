import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { AUTaskLengthDB, TaskLength } from "../../../../types/generic/TaskLength";
import useSelectedElemType from "../../../../hooks/elements/useSelectedElemType";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";

export default function TaskTypeSelect() {
    const { t } = useTranslation();
    const type = useSelectedElemType();
    const [taskLength, setTaskLength] = useSelectedElemProp("taskLength");

    const defaultTaskLength = React.useMemo(() => {
        if (!type)
            return TaskLength.Short;
        if (type in AUTaskLengthDB)
            return AUTaskLengthDB[type as keyof typeof AUTaskLengthDB];
    }, [type]);

    return (
        <Autocomplete
            value={taskLength ?? defaultTaskLength}
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
                    setTaskLength(taskLength as TaskLength);
                else
                    setTaskLength(undefined);
            }}
        />
    )
}