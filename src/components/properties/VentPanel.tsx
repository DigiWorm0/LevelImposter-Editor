import { Button, ControlGroup, Divider, H5, MenuItem } from "@blueprintjs/core";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import useElement, { useElements } from "../../hooks/useElement";
import useMap from "../../hooks/useMap";
import GUID from "../../types/generic/GUID";
import LIElement from "../../types/li/LIElement";

const VentSelect = Select2.ofType<LIElement>();

export default function VentPanel(props: { elementID: GUID }) {
    const [map] = useMap();
    const [allElements] = useElements(map.elementIDs);
    const [ventElements, setVentElements] = React.useState([] as LIElement[]);

    const [element, setElement] = useElement(props.elementID);

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
        const newVentElements = allElements.filter((elem) => (elem.type.startsWith("util-vent") && elem.id != props.elementID));
        setVentElements(newVentElements);
    }, [allElements, props.elementID]);

    if (element.id === "")
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
