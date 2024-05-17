import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/map/elements/useSelectedElem";
import { AUTaskLengthDB, TaskLength } from "../../../types/generic/TaskLength";
import ResettablePanelInput from "./ResettablePanelInput";
import { Box, MenuItem, Select } from "@mui/material";

export default function TaskTypeSelect() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const defaultTaskLength = React.useMemo(() => {
        if ((selectedElem?.type ?? "") in AUTaskLengthDB)
            return AUTaskLengthDB[(selectedElem?.type ?? "") as keyof typeof AUTaskLengthDB];
    }, [selectedElem]);

    if (!selectedElem)
        return null;

    return (
        <Box
            style={{
                marginBottom: 5,
                marginTop: 5
            }}
        >
            <ResettablePanelInput
                onReset={() => {
                    setSelectedElem({
                        ...selectedElem,
                        properties: { ...selectedElem.properties, taskLength: undefined }
                    });
                }}
            >
                <Select
                    fullWidth
                    value={selectedElem.properties.taskLength ?? defaultTaskLength}
                    onChange={(e) => {
                        setSelectedElem({
                            ...selectedElem,
                            properties: { ...selectedElem.properties, taskLength: e.target.value }
                        });
                    }}
                >
                    <MenuItem value={undefined}>
                        <em>{t(`task.defaultLength`)}</em>
                    </MenuItem>
                    <MenuItem value={TaskLength.Short}>{t(`task.Short`)}</MenuItem>
                    <MenuItem value={TaskLength.Long}>{t(`task.Long`)}</MenuItem>
                    <MenuItem value={TaskLength.Common}>{t(`task.Common`)}</MenuItem>
                </Select>
            </ResettablePanelInput>
        </Box>
    )
}