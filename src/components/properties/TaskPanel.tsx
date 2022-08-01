import { Button, ControlGroup, FormGroup, H5, InputGroup, MenuItem } from "@blueprintjs/core";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import { useRooms } from "../../hooks/jotai/useMap";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import useSprite from "../../hooks/useSprite";
import AUElementDB from "../../types/au/AUElementDB";
import TaskLength from "../../types/generic/TaskLength";
import LIElement from "../../types/li/LIElement";
import PanelContainer from "./PanelContainer";

const RoomSelect = Select2.ofType<LIElement>();
const LengthSelect = Select2.ofType<string>();

export default function TaskPanel() {
    const roomElems = useRooms();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [taskName, setTaskName] = React.useState("");
    const sprite = useSprite(selectedElem?.id, true);

    const parentRoom = roomElems.find((e) => e.id === selectedElem?.properties.parent);

    React.useEffect(() => {
        const auElement = AUElementDB.find((elem) => elem.type === selectedElem?.type);
        setTaskName(auElement ? auElement.name : "Unknown");
    }, [selectedElem]);

    const roomSelectRenderer: ItemRenderer<LIElement> = (elem, props) => (
        <MenuItem
            key={elem.type + props.index + "-room"}
            text={elem.name}
            label={elem.type}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );
    const lengthSelectRenderer: ItemRenderer<string> = (length, props) => (
        <MenuItem
            key={props.index + "-length"}
            text={length + " Task"}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    const hasRooms = roomElems.length > 0;

    if (!selectedElem
        || !selectedElem.type.startsWith("task-"))
        return null;

    return (
        <PanelContainer title="Task">
            <div style={{ textAlign: "center", padding: 15 }}>
                <img
                    style={{ maxHeight: 100, maxWidth: 100 }}
                    src={sprite?.src}
                    alt={selectedElem.name}
                />
                <H5 style={{ marginBottom: 3 }}>{taskName}</H5>
                <p className="bp4-text-muted">{selectedElem.type}</p>
            </div>
            <FormGroup>
                <ControlGroup fill>
                    <RoomSelect
                        fill
                        filterable={false}
                        disabled={!hasRooms}
                        items={roomElems}
                        itemRenderer={roomSelectRenderer}
                        onItemSelect={(room) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, parent: room.id } });
                        }}>

                        <Button
                            rightIcon="caret-down"
                            text={parentRoom ? parentRoom.name : "(Default Room)"}
                            style={{ fontStyle: parentRoom !== undefined ? "normal" : "italic" }}
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
                <ControlGroup fill>
                    <LengthSelect
                        fill
                        filterable={false}
                        items={TaskLength}
                        itemRenderer={lengthSelectRenderer}
                        onItemSelect={(length) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, taskLength: length } });
                        }}>

                        <Button
                            rightIcon="caret-down"
                            text={selectedElem.properties.taskLength !== undefined ? selectedElem.properties.taskLength.toString() + " Task" : "(Default Length)"}
                            style={{ fontStyle: selectedElem.properties.taskLength !== undefined ? "normal" : "italic" }}
                            fill
                        />
                    </LengthSelect>
                    <Button
                        minimal
                        rightIcon="cross"
                        onClick={() => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, taskLength: undefined } });
                        }}
                    />
                </ControlGroup>
                <ControlGroup fill style={{ marginTop: 5 }}>
                    <InputGroup
                        key={selectedElem.id + "-description"}
                        fill
                        leftIcon="info-sign"
                        placeholder={"(Default Description)"}
                        defaultValue={selectedElem.properties.description ? selectedElem.properties.description : ""}
                        onChange={(e) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, description: e.currentTarget.value } });
                        }}
                    />
                    <Button
                        minimal
                        rightIcon="cross"
                        onClick={() => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, description: "" } });
                        }}
                    />
                </ControlGroup>
            </FormGroup>
        </PanelContainer>
    );
}
