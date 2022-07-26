import { Button, ControlGroup, H5, MenuItem } from "@blueprintjs/core";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import { useRooms } from "../../hooks/jotai/useMap";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import AUElementDB from "../../types/au/AUElementDB";
import LIElement from "../../types/li/LIElement";
import PanelContainer from "./PanelContainer";

const URL_PREFIX = "/sprites/";
const URL_SUFFIX = ".png";

const RoomSelect = Select2.ofType<LIElement>();

export default function SabPanel() {
    const roomElems = useRooms();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [sabName, setSabName] = React.useState("");

    const parentRoom = roomElems.find((e) => e.id === selectedElem?.properties.parent);

    React.useEffect(() => {
        const auElement = AUElementDB.find((elem) => elem.type === selectedElem?.type);
        setSabName(auElement ? auElement.name : "");
    }, [selectedElem]);

    const roomSelectRenderer: ItemRenderer<LIElement> = (elem, props) => (
        <MenuItem
            key={elem.type + props.index}
            text={elem.name}
            label={elem.type}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    if (!selectedElem
        || !selectedElem.type.startsWith("sab"))
        return null;

    return (
        <PanelContainer title="Sabotage">
            <div style={{ textAlign: "center", margin: 15 }}>
                <img
                    style={{ maxHeight: 100, maxWidth: 100 }}
                    src={URL_PREFIX + selectedElem.type + URL_SUFFIX}
                    alt={selectedElem.name}
                />
                <H5 style={{ marginBottom: 3 }}>{sabName}</H5>
                <p className="bp4-text-muted">{selectedElem.type}</p>
            </div>
            <ControlGroup fill>
                <RoomSelect
                    fill
                    filterable={false}
                    items={roomElems}
                    itemRenderer={roomSelectRenderer}
                    onItemSelect={(room) => {
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
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, parent: undefined } });
                    }}
                />
            </ControlGroup>
        </PanelContainer>
    );
}
