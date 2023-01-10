import { Button, ControlGroup, H5, InputGroup, NumericInput } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useElementType } from "../../hooks/jotai/useTypes";
import { useSpriteType } from "../../hooks/useSprite";
import DescriptionInput from "./DescriptionInput";
import MapError from "./MapError";
import PanelContainer from "./PanelContainer";
import RoomSelect from "./RoomSelect";

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
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [sabName, setSabName] = React.useState("");
    const sprite = useSpriteType(selectedElem?.type);
    const roomElems = useElementType("util-room");

    const parentRoom = roomElems.find((e) => e.id === selectedElem?.properties.parent);
    const showTimer = timerElems.includes(selectedElem?.type ?? "");

    React.useEffect(() => {
        setSabName(t(`au.${selectedElem?.type}`) || selectedElem?.name || "");
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
                <DescriptionInput />
                {showTimer && (
                    <NumericInput
                        key={selectedElem.id + "-duration"}
                        fill
                        placeholder={t("sab.duration") as string}
                        defaultValue={selectedElem.properties.sabDuration ?? 45}
                        min={0}
                        minorStepSize={1}
                        stepSize={5}
                        majorStepSize={15}
                        leftIcon="time"
                        rightElement={<Button minimal disabled>seconds</Button>}
                        onValueChange={(val) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, sabDuration: val } });
                        }}
                    />
                )}
            </PanelContainer>

            <MapError isVisible={parentRoom === undefined}>
                {t("sab.errorNoRoom") as string}
            </MapError>
            <MapError isVisible={selectedElem.type === "sab-btndoors"} info>
                {t("sab.doorInfo") as string}
            </MapError>
        </>
    );
}
