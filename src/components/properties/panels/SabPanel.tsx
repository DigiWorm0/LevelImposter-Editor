import { H5 } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useConnections } from "../../../hooks/jotai/useConnections";
import { useSelectedElemValue } from "../../../hooks/jotai/useSelectedElem";
import { useElementType } from "../../../hooks/jotai/useTypes";
import { useSpriteType } from "../../../hooks/useSprite";
import NumericPanelInput from "../input/NumericPanelInput";
import RoomSelect from "../input/RoomSelect";
import TextPanelInput from "../input/TextPanelInput";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";

const timerElems = [
    "sab-reactorleft",
    "sab-reactorright",
    "sab-btnreactor",
    "sab-oxygen1",
    "sab-oxygen2",
    "sab-btnoxygen",
]

export default function SabPanel() {
    const { t } = useTranslation();
    const selectedElem = useSelectedElemValue();
    const [sabName, setSabName] = React.useState("");
    const sprite = useSpriteType(selectedElem?.type);
    const roomElems = useElementType("util-room");
    const [targetConnections, sourceConnections] = useConnections(selectedElem?.properties.parent);

    const otherSab = React.useMemo(() => {
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
                    <H5 style={{ marginBottom: 3 }}>{sabName}</H5>
                    <p className="bp4-text-muted">{selectedElem.type}</p>
                </div>
                <RoomSelect useDefault={true} />
                <TextPanelInput
                    prop="description"
                    name={"sab.description"}
                    icon={"comment"}
                />
                {showTimer && (
                    <NumericPanelInput
                        prop="sabDuration"
                        name={"sab.duration"}
                        defaultValue={45}
                        min={0}
                        minorStepSize={1}
                        stepSize={5}
                        majorStepSize={15}
                        label={"seconds"}
                        icon="time"
                    />
                )}
            </PanelContainer>

            <MapError isVisible={parentRoom === undefined}>
                {t("sab.errorNoRoom") as string}
            </MapError>
            <MapError isVisible={selectedElem.type === "sab-btndoors"} info>
                {t("sab.doorInfo") as string}
            </MapError>
            <MapError isVisible={otherSab !== undefined}>
                {t("sab.errorMultipleSabs", { name: otherSab?.name }) as string}
            </MapError>
        </>
    );
}
