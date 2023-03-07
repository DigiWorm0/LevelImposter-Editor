import React from "react";
import { Button, FormGroup } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import { useElementType } from "../../../hooks/jotai/useTypes";
import LIElement from "../../../types/li/LIElement";
import ResettablePanelInput from "./ResettablePanelInput";

export default function RoomSelect(props: { useDefault: boolean }) {
    const { t } = useTranslation();
    const roomElems = useElementType("util-room");
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const parentRoom = React.useMemo(() => {
        return roomElems.find((e) => e.id === selectedElem?.properties.parent);
    }, [roomElems, selectedElem]);
    const hasRooms = React.useMemo(() => {
        return roomElems.length > 0;
    }, [roomElems]);

    const roomSelectRenderer: ItemRenderer<LIElement> = (elem, props) => (
        <MenuItem2
            key={elem.type + props.index + "-room"}
            text={elem.name.replace("\\n", " ")}
            label={elem.type}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    if (!selectedElem)
        return null;

    return (
        <FormGroup
            style={{
                marginBottom: 5,
                marginTop: 5
            }}
        >
            <Tooltip2
                content={!hasRooms ? t("room.errorNoRooms") as string : undefined}
                disabled={hasRooms}
                fill
                intent="danger"
            >
                <ResettablePanelInput
                    onReset={() => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, parent: undefined } });
                    }}
                >
                    <Select2
                        fill
                        filterable={false}
                        disabled={!hasRooms}
                        items={roomElems}
                        itemRenderer={roomSelectRenderer}
                        onItemSelect={(room) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, parent: room.id } });
                        }}
                        popoverProps={{ minimal: true }}
                    >

                        <Button
                            rightIcon="caret-down"
                            text={parentRoom ? parentRoom.name.replace("\\n", " ") : (props.useDefault ? t("room.default") : t("room.none"))}
                            style={{
                                fontStyle: parentRoom !== undefined ? "normal" : "italic"
                            }}
                            fill
                            disabled={!hasRooms}
                        />

                    </Select2>
                </ResettablePanelInput>
            </Tooltip2>
        </FormGroup>
    )
}