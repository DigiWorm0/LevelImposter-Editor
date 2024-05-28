import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import useSpriteOfType from "../../../hooks/canvas/sprite/useSpriteOfType";
import { useElementsOfType } from "../../../hooks/elements/useElementsOfType";
import RoomSelect from "../input/select/RoomSelect";
import TaskTypeSelect from "../input/select/TaskTypeSelect";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import ElementPropTextInput from "../input/elementProps/ElementPropTextInput";
import useSelectedElemType from "../../../hooks/elements/useSelectedElemType";
import { useSelectedElemPropValue } from "../../../hooks/elements/useSelectedElemProperty";
import { Notes, Room, Workspaces } from "@mui/icons-material";

export default function TaskPanel() {
    const { t } = useTranslation();
    const selectedType = useSelectedElemType();
    const roomElems = useElementsOfType("util-room");
    const taskElems = useElementsOfType("task-");
    const typeElems = useElementsOfType(selectedType ?? "");
    const parentID = useSelectedElemPropValue("parent");
    const sprite = useSpriteOfType(selectedType);

    const parentRoom = React.useMemo(() => {
        return roomElems.find((e) => e.id === parentID);
    }, [roomElems, parentID]);

    const hasDuplicateTempTask = React.useMemo(() => {
        const tempTasks = taskElems.filter((e) => e.type.startsWith("task-temp"));
        const filteredTempTasks = tempTasks.filter((e) => e.properties.parent === parentID);
        return filteredTempTasks.length > 1 && selectedType?.startsWith("task-temp");
    }, [taskElems, selectedType]);

    const towelCount = React.useMemo(() => {
        return taskElems.filter((e) => e.type.startsWith("task-towels") && e.type !== "task-towels1").length;
    }, [taskElems]);

    if (!selectedType || !selectedType.startsWith("task-"))
        return null;

    return (
        <>
            <PanelContainer title={t("task.title") as string}>
                <Box sx={{ textAlign: "center", padding: 2 }}>
                    <img
                        style={{ maxHeight: 100, maxWidth: 100 }}
                        src={sprite?.src}
                        alt={selectedType}
                    />
                    <Typography variant={"subtitle2"}>
                        {t(`au.${selectedType}`)}
                    </Typography>
                    <Typography variant={"body2"} color={"text.secondary"}>
                        {selectedType}
                    </Typography>
                </Box>
                <RoomSelect
                    useDefault={true}
                    label={t("task.room")}
                />
                <TaskTypeSelect />
                {selectedType !== "task-nodeswitch" && (
                    <ElementPropTextInput
                        prop="description"
                        name={t("task.description")}
                        icon={<Notes />}
                    />
                )}

                {selectedType.startsWith("task-towels") && (
                    <ElementPropNumericInput
                        name={t("task.towelPickupCount")}
                        prop={"towelPickupCount"}
                        icon={<Workspaces />}
                        defaultValue={Math.floor(towelCount / 2)}
                        min={0}
                        stepSize={1}
                        max={towelCount}
                    />
                )}
            </PanelContainer>

            <MapError
                isVisible={selectedType === "task-fuel2" && typeElems.length === 1}
            >
                {t("task.errorNoFuel")}
            </MapError>
            <MapError
                isVisible={parentRoom === undefined}
                icon={<Room />}
            >
                {t("task.errorNoRoom")}
            </MapError>
            <MapError
                isVisible={hasDuplicateTempTask}
                icon={<Room />}
            >
                {t("task.errorTemp")}
            </MapError>
        </>
    );
}
