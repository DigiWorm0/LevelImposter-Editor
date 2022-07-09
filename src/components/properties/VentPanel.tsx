import { Button, Card, ControlGroup, Divider, FormGroup, H2, H4, H5, H6, InputGroup, MenuItem, NumericInput } from "@blueprintjs/core";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import useElement, { removeElement, useElements } from "../../hooks/useElement";
import useMap from "../../hooks/useMap";
import useSelected from "../../hooks/useSelected";
import AUElementDB from "../../types/au/AUElementDB";
import LIElement from "../../types/li/LIElement";

const VentSelect = Select2.ofType<LIElement>();

export default function VentPanel() {
    const [map] = useMap();
    const [allElements] = useElements(map.elementIDs);
    const [ventElements, setVentElements] = React.useState([] as LIElement[]);

    const [selectedID, setSelectedID] = useSelected();
    const [element, setElement] = useElement(selectedID);

    const leftVent = allElements.find((e) => e.id === element.properties.leftVent);
    const middleVent = allElements.find((e) => e.id === element.properties.middleVent);
    const rightVent = allElements.find((e) => e.id === element.properties.rightVent);

    const ventSelectRenderer: ItemRenderer<LIElement> = (elem, props) => (
        <MenuItem
            key={elem.type + props.index}
            text={elem.name}
            label={elem.type}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    React.useEffect(() => {
        const newVentElements = allElements.filter((elem) => (elem.type.startsWith("util-vent") && elem.id != selectedID));
        setVentElements(newVentElements);
    }, [allElements, selectedID]);

    if (selectedID === "")
        return null;
    if (!element.type.startsWith("util-vent"))
        return null;

    return (
        <div className="vent-panel">
            <H5 style={{ marginTop: 25 }}>Vent</H5>
            <Divider />

            <ControlGroup fill>
                <VentSelect
                    fill
                    filterable={false}
                    items={ventElements}
                    itemRenderer={ventSelectRenderer}
                    onItemSelect={(vent) => {
                        setElement({ ...element, properties: { ...element.properties, leftVent: vent.id } });
                    }}>

                    <Button
                        rightIcon="caret-down"
                        text={leftVent ? leftVent.name : "(No connection)"}
                        fill
                    />
                </VentSelect>
                <Button
                    minimal
                    rightIcon="cross"
                    onClick={() => {
                        setElement({ ...element, properties: { ...element.properties, leftVent: undefined } });
                    }}
                />
            </ControlGroup>

            <ControlGroup fill>
                <VentSelect
                    fill
                    filterable={false}
                    items={ventElements}
                    itemRenderer={ventSelectRenderer}
                    onItemSelect={(vent) => {
                        setElement({ ...element, properties: { ...element.properties, middleVent: vent.id } });
                    }}>

                    <Button
                        rightIcon="caret-down"
                        text={middleVent ? middleVent.name : "(No connection)"}
                        fill
                    />
                </VentSelect>
                <Button
                    minimal
                    rightIcon="cross"
                    onClick={() => {
                        setElement({ ...element, properties: { ...element.properties, middleVent: undefined } });
                    }}
                />
            </ControlGroup>

            <ControlGroup fill>
                <VentSelect
                    fill
                    filterable={false}
                    items={ventElements}
                    itemRenderer={ventSelectRenderer}
                    onItemSelect={(vent) => {
                        setElement({ ...element, properties: { ...element.properties, rightVent: vent.id } });
                    }}>

                    <Button
                        rightIcon="caret-down"
                        text={rightVent ? rightVent.name : "(No connection)"}
                        fill
                    />
                </VentSelect>
                <Button
                    minimal
                    rightIcon="cross"
                    onClick={() => {
                        setElement({ ...element, properties: { ...element.properties, rightVent: undefined } });
                    }}
                />
            </ControlGroup>
        </div>
    );
}
