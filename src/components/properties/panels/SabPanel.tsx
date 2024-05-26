import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import useSpriteOfType from "../../../hooks/canvas/sprite/useSpriteOfType";
import { useConnections } from "../../../hooks/elements/useConnections";
import { useSelectedElemValue } from "../../../hooks/elements/useSelectedElem";
import { useElementsOfType } from "../../../hooks/elements/useElementsOfType";
import RoomSelect from "../input/select/RoomSelect";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import ElementPropNumericInput from "../input/elementProps/ElementPropNumericInput";
import ElementPropTextInput from "../input/elementProps/ElementPropTextInput";

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
    const selectedElem = useSelectedElemValue();
    const [sabName, setSabName] = React.useState("");
    const sprite = useSpriteOfType(selectedElem?.type);
    const roomElems = useElementsOfType("util-room");
    const [, sourceConnections] = useConnections(selectedElem?.properties.parent);

    const otherSab = React.useMemo(() => {
        if (selectedElem?.type.startsWith("sab-btn"))
            return undefined;
        return sourceConnections?.find((c) => c.type.startsWith("sab-") && c.id !== selectedElem?.id && !c.type.startsWith("sab-btn"));
    }, [sourceConnections, selectedElem]);

    React.useEffect(() => {
        setSabName(t(`au.${selectedElem?.type}`) || selectedElem?.name || "");
    }, [selectedElem]);

    const parentRoom = React.useMemo(() => {
        return roomElems.find((e) => e.id === selectedElem?.properties.parent);
    }, [roomElems, selectedElem]);
    const showTimer = React.useMemo(() => {
        return timerElems.includes(selectedElem?.type ?? "");
    }, [selectedElem]);

    if (!selectedElem
        || !selectedElem.type.startsWith("sab-")
        || selectedElem.type.startsWith("sab-door"))
        return null;

    return (
        <>
            <PanelContainer title={t("sab.title") as string}>
                <div style={{ textAlign: "center", margin: 15 }}>
                    <img
                        style={{ maxHeight: 100, maxWidth: 100 }}
                        src={sprite?.src}
                        alt={selectedElem.name}
                    />
                    <Typography variant={"subtitle2"}>
                        {sabName}
                    </Typography>
                    <Typography variant={"body2"} sx={{ color: "text.secondary" }}>
                        {selectedElem.type}
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
                        defaultValue={selectedElem.type === "sab-btnmixup" ? 10 : 45}
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
                isVisible={selectedElem.type === "sab-btndoors"}
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
