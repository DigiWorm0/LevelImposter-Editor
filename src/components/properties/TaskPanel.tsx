import { Button, ControlGroup, FormGroup, H5, InputGroup } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useElementType } from "../../hooks/jotai/useTypes";
import { useSpriteType } from "../../hooks/useSprite";
import TaskLength from "../../types/generic/TaskLength";
import DescriptionInput from "./DescriptionInput";
import MapError from "./MapError";
import PanelContainer from "./PanelContainer";
import RoomSelect from "./RoomSelect";

const LengthSelect = Select2.ofType<string>();

export default function TaskPanel() {
    const { t } = useTranslation();
    const roomElems = useElementType("util-room");
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const typeElems = useElementType(selectedElem?.type ?? "");
    const [taskName, setTaskName] = React.useState("");
    const sprite = useSpriteType(selectedElem?.type);

    const parentRoom = roomElems.find((e) => e.id === selectedElem?.properties.parent);

    React.useEffect(() => {
        setTaskName(t(`au.${selectedElem?.type}`) || selectedElem?.name || "");
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

    if (!selectedElem
        || !selectedElem.type.startsWith("task-"))
        return null;

    return (
        <>
            <PanelContainer title={t("task.title") as string}>
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
                                setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, taskLength: length } });
                            }}>

                            <Button
                                rightIcon="caret-down"
                                text={selectedElem.properties.taskLength !== undefined ?
                                    selectedElem.properties.taskLength.toString() :
                                    t("task.defaultLength")}
                                style={{ fontStyle: selectedElem.properties.taskLength !== undefined ? "normal" : "italic" }}
                                fill
                            />
                        </LengthSelect>
                        <Button
                            minimal
                            rightIcon="refresh"
                            onClick={() => {
                                setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, taskLength: undefined } });
                            }}
                        />
                    </ControlGroup>
                    <DescriptionInput />
                </FormGroup>
            </PanelContainer>
            <MapError isVisible={selectedElem.type === "task-fuel2" && typeElems.length === 1}>
                {t("task.errorNoFuel")}
            </MapError>
            <MapError isVisible={parentRoom === undefined}>
                {t("task.errorNoRoom")}
            </MapError>
        </>
    );
}
