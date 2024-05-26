import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import useSpriteOfType from "../../../hooks/canvas/sprite/useSpriteOfType";
import { useSelectedElemValue } from "../../../hooks/elements/useSelectedElem";
import { useElementsOfType } from "../../../hooks/elements/useElementsOfType";
import RoomSelect from "../input/select/RoomSelect";
import TaskTypeSelect from "../input/select/TaskTypeSelect";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import ElementPropTextInput from "../input/elementProps/ElementPropTextInput";

export default function TaskPanel() {
    const { t } = useTranslation();
    const roomElems = useElementsOfType("util-room");
    const taskElems = useElementsOfType("task-");
    const selectedElem = useSelectedElemValue();
    const typeElems = useElementsOfType(selectedElem?.type ?? "");
    const sprite = useSpriteOfType(selectedElem?.type);

    const parentRoom = React.useMemo(() => {
        return roomElems.find((e) => e.id === selectedElem?.properties.parent);
    }, [roomElems, selectedElem]);

    const taskName = React.useMemo(() => {
        return t(`au.${selectedElem?.type}`) || selectedElem?.name || "";
    }, [selectedElem]);

    const hasDuplicateTempTask = React.useMemo(() => {
        const tempTasks = taskElems.filter((e) => e.type.startsWith("task-temp"));
        const filteredTempTasks = tempTasks.filter((e) => e.properties.parent === selectedElem?.properties.parent);
        return filteredTempTasks.length > 1 && selectedElem?.type.startsWith("task-temp");
    }, [taskElems, selectedElem]);

    const towelCount = React.useMemo(() => {
        return taskElems.filter((e) => e.type.startsWith("task-towels") && e.type !== "task-towels1").length;
    }, [taskElems]);

    if (!selectedElem || !selectedElem.type.startsWith("task-"))
        return null;

    return (
        <>
            <PanelContainer title={t("task.title") as string}>
                <Box sx={{ textAlign: "center", padding: 2 }}>
                    <img
                        style={{ maxHeight: 100, maxWidth: 100 }}
                        src={sprite?.src}
                        alt={selectedElem.name}
                    />
                    <Typography variant={"subtitle2"}>
                        {taskName}
                    </Typography>
                    <Typography variant={"body2"} color={"text.secondary"}>
                        {selectedElem.type}
                    </Typography>
                </Box>
                <RoomSelect
                    useDefault={true}
                    label={t("task.room")}
                />
                <TaskTypeSelect />
                {selectedElem.type !== "task-nodeswitch" && (
                    <ElementPropTextInput
                        prop="description"
                        name={t("task.description")}
                        icon={"Notes"}
                    />
                )}

                {selectedElem.type.startsWith("task-towels") && (
                    <ElementPropNumericInput
                        name={t("task.towelPickupCount")}
                        prop={"towelPickupCount"}
                        icon={"Workspaces"}
                        defaultValue={Math.floor(towelCount / 2)}
                        min={0}
                        stepSize={1}
                        max={towelCount}
                    />
                )}
            </PanelContainer>

            <MapError
                isVisible={selectedElem.type === "task-fuel2" && typeElems.length === 1}
            >
                {t("task.errorNoFuel")}
            </MapError>
            <MapError
                isVisible={parentRoom === undefined}
                icon="Room"
            >
                {t("task.errorNoRoom")}
            </MapError>
            <MapError
                isVisible={hasDuplicateTempTask}
                icon="Room"
            >
                {t("task.errorTemp")}
            </MapError>
        </>
    );
}
