import { Button, ControlGroup, H5, InputGroup } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useElementType } from "../../hooks/jotai/useTypes";
import { useSpriteType } from "../../hooks/useSprite";
import DescriptionInput from "./DescriptionInput";
import MapError from "./MapError";
import PanelContainer from "./PanelContainer";
import RoomSelect from "./RoomSelect";

export default function SabPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [sabName, setSabName] = React.useState("");
    const sprite = useSpriteType(selectedElem?.type);
    const roomElems = useElementType("util-room");

    const parentRoom = roomElems.find((e) => e.id === selectedElem?.properties.parent);

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
            </PanelContainer>

            <MapError isVisible={parentRoom === undefined}>
                {t("sab.errorNoRoom") as string}
            </MapError>
        </>
    );
}
