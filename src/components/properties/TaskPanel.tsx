import { Button, ControlGroup, FormGroup, H5, InputGroup } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import { useRooms } from "../../hooks/jotai/useMap";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useSpriteType } from "../../hooks/useSprite";
import useTranslation from "../../hooks/useTranslation";
import AUElementDB from "../../types/au/AUElementDB";
import TaskLength from "../../types/generic/TaskLength";
import PanelContainer from "./PanelContainer";
import RoomSelect from "./RoomSelect";

const LengthSelect = Select2.ofType<string>();

export default function TaskPanel() {
    const translation = useTranslation();
    const roomElems = useRooms();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [taskName, setTaskName] = React.useState("");
    const sprite = useSpriteType(selectedElem?.type);
    const saveHistory = useSaveHistory();

    const parentRoom = roomElems.find((e) => e.id === selectedElem?.properties.parent);

    React.useEffect(() => {
        const auElement = AUElementDB.find((elem) => elem.type === selectedElem?.type);
        setTaskName(auElement ? auElement.name : "Unknown");
    }, [selectedElem]);

    const lengthSelectRenderer: ItemRenderer<string> = (length, props) => (
        <MenuItem2
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
        <PanelContainer title={translation.Task}>
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
                <RoomSelect useDefault={true} />
                <ControlGroup fill>
                    <LengthSelect
                        fill
                        filterable={false}
                        items={TaskLength}
                        itemRenderer={lengthSelectRenderer}
                        onItemSelect={(length) => {
                            saveHistory();
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, taskLength: length } });
                        }}>

                        <Button
                            rightIcon="caret-down"
                            text={selectedElem.properties.taskLength !== undefined ? selectedElem.properties.taskLength.toString() + " " + translation.Task : translation.DefaultLength}
                            style={{ fontStyle: selectedElem.properties.taskLength !== undefined ? "normal" : "italic" }}
                            fill
                        />
                    </LengthSelect>
                    <Button
                        minimal
                        rightIcon="cross"
                        onClick={() => {
                            saveHistory();
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, taskLength: undefined } });
                        }}
                    />
                </ControlGroup>
                <ControlGroup fill style={{ marginTop: 5 }}>
                    <InputGroup
                        key={selectedElem.id + "-description"}
                        fill
                        leftIcon="info-sign"
                        placeholder={translation.DefaultDescription}
                        defaultValue={selectedElem.properties.description ? selectedElem.properties.description : ""}
                        onChange={(e) => {
                            saveHistory();
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, description: e.currentTarget.value } });
                        }}
                    />
                    <Button
                        minimal
                        rightIcon="cross"
                        onClick={() => {
                            saveHistory();
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, description: "" } });
                        }}
                    />
                </ControlGroup>
            </FormGroup>
        </PanelContainer>
    );
}
