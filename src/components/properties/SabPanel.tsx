import { Button, ControlGroup, H5 } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import { useRooms } from "../../hooks/jotai/useMap";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useSpriteType } from "../../hooks/useSprite";
import AUElementDB from "../../types/au/AUElementDB";
import LIElement from "../../types/li/LIElement";
import PanelContainer from "./PanelContainer";

const RoomSelect = Select2.ofType<LIElement>();

export default function SabPanel() {
    const roomElems = useRooms();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [sabName, setSabName] = React.useState("");
    const sprite = useSpriteType(selectedElem?.type);
    const saveHistory = useSaveHistory();

    const parentRoom = roomElems.find((e) => e.id === selectedElem?.properties.parent);

    React.useEffect(() => {
        const auElement = AUElementDB.find((elem) => elem.type === selectedElem?.type);
        setSabName(auElement ? auElement.name : "Unknown");
    }, [selectedElem]);

    const roomSelectRenderer: ItemRenderer<LIElement> = (elem, props) => (
        <MenuItem2
            key={elem.type + props.index}
            text={elem.name}
            label={elem.type}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    const hasRooms = roomElems.length > 0;

    if (!selectedElem
        || !selectedElem.type.startsWith("sab-"))
        return null;

    return (
        <PanelContainer title="Sabotage">
            <div style={{ textAlign: "center", margin: 15 }}>
                <img
                    style={{ maxHeight: 100, maxWidth: 100 }}
                    src={sprite?.src}
                    alt={selectedElem.name}
                />
                <H5 style={{ marginBottom: 3 }}>{sabName}</H5>
                <p className="bp4-text-muted">{selectedElem.type}</p>
            </div>
            <ControlGroup fill>
                <RoomSelect
                    fill
                    filterable={false}
                    disabled={!hasRooms}
                    items={roomElems}
                    itemRenderer={roomSelectRenderer}
                    onItemSelect={(room) => {
                        saveHistory();
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, parent: room.id } });
                    }}>

                    <Button
                        rightIcon="caret-down"
                        text={parentRoom ? parentRoom.name : "(Default Room)"}
                        fill
                    />
                </RoomSelect>
                <Button
                    minimal
                    rightIcon="cross"
                    onClick={() => {
                        saveHistory();
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, parent: undefined } });
                    }}
                />
            </ControlGroup>
        </PanelContainer>
    );
}
