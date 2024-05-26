import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import useSpriteOfType from "../../../hooks/canvas/sprite/useSpriteOfType";
import { useConnections } from "../../../hooks/elements/useConnections";
import { useElementsOfType } from "../../../hooks/elements/useElementsOfType";
import RoomSelect from "../input/select/RoomSelect";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import ElementPropTextInput from "../input/elementProps/ElementPropTextInput";
import useSelectedElemType from "../../../hooks/elements/useSelectedElemType";
import { useSelectedElemPropValue } from "../../../hooks/elements/useSelectedElemProperty";

const timerElems = [
    "sab-reactorleft",
    "sab-reactorright",
    "sab-btnreactor",
    "sab-oxygen1",
    "sab-oxygen2",
    "sab-btnoxygen",
    "sab-btnmixup"
]

export default function SabPanel() {
    const { t } = useTranslation();
    const selectedType = useSelectedElemType();
    const parentID = useSelectedElemPropValue("parent");
    const sprite = useSpriteOfType(selectedType);
    const roomElems = useElementsOfType("util-room");
    const [, sourceConnections] = useConnections(parentID);

    const otherSab = React.useMemo(() => {
        if (selectedType?.startsWith("sab-btn"))
            return undefined;
        return sourceConnections?.find((c) => c.type.startsWith("sab-") && !c.type.startsWith("sab-btn"));
    }, [sourceConnections, selectedType]);

    const parentRoom = React.useMemo(() => {
        return roomElems.find((e) => e.id === parentID);
    }, [roomElems, parentID]);
    
    const showTimer = React.useMemo(() => {
        return timerElems.includes(selectedType ?? "");
    }, [selectedType]);

    if (!selectedType
        || !selectedType.startsWith("sab-")
        || selectedType.startsWith("sab-door"))
        return null;

    return (
        <>
            <PanelContainer title={t("sab.title") as string}>
                <div style={{ textAlign: "center", margin: 15 }}>
                    <img
                        style={{ maxHeight: 100, maxWidth: 100 }}
                        src={sprite?.src}
                        alt={selectedType}
                    />
                    <Typography variant={"subtitle2"}>
                        {t(`au.${selectedType}`)}
                    </Typography>
                    <Typography variant={"body2"} sx={{ color: "text.secondary" }}>
                        {selectedType}
                    </Typography>
                </div>
                <RoomSelect useDefault={true} />
                <ElementPropTextInput
                    name={t("sab.description")}
                    prop="description"
                    icon={"Comment"}
                />
                {showTimer && (
                    <ElementPropNumericInput
                        name={t("sab.duration")}
                        prop="sabDuration"
                        defaultValue={selectedType === "sab-btnmixup" ? 10 : 45}
                        min={0}
                        stepSize={5}
                        label={"seconds"}
                        icon="Timer"
                    />
                )}
            </PanelContainer>

            <MapError
                isVisible={parentRoom === undefined}
                icon="Room"
            >
                {t("sab.errorNoRoom") as string}
            </MapError>
            <MapError
                isVisible={selectedType === "sab-btndoors"}
                info
                icon="Room"
            >
                {t("sab.doorInfo") as string}
            </MapError>
            <MapError
                isVisible={otherSab !== undefined}
            >
                {t("sab.errorMultipleSabs", { name: otherSab?.name }) as string}
            </MapError>
        </>
    );
}
