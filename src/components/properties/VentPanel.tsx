import { Button, ControlGroup, MenuItem } from "@blueprintjs/core";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useVents } from "../../hooks/jotai/useVents";
import LIElement from "../../types/li/LIElement";
import PanelContainer from "./PanelContainer";

const VentSelect = Select2.ofType<LIElement>();

export default function VentPanel() {
    const ventElems = useVents();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const saveHistory = useSaveHistory();

    const filteredVents = ventElems.filter((elem) => elem.id !== selectedElem?.id);

    const leftVent = ventElems.find((e) => e.id === selectedElem?.properties.leftVent);
    const middleVent = ventElems.find((e) => e.id === selectedElem?.properties.middleVent);
    const rightVent = ventElems.find((e) => e.id === selectedElem?.properties.rightVent);

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

    const hasVents = filteredVents.length >= 1;

    if (!selectedElem
        || !selectedElem.type.startsWith("util-vent"))
        return null;

    return (
        <PanelContainer title="Vent">
            <ControlGroup fill>
                <VentSelect
                    fill
                    filterable={false}
                    disabled={!hasVents}
                    items={filteredVents}
                    itemRenderer={ventSelectRenderer}
                    onItemSelect={(vent) => {
                        saveHistory();
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, leftVent: vent.id } });
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
                        saveHistory();
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, leftVent: undefined } });
                    }}
                />
            </ControlGroup>

            <ControlGroup fill>
                <VentSelect
                    fill
                    filterable={false}
                    disabled={!hasVents}
                    items={filteredVents}
                    itemRenderer={ventSelectRenderer}
                    onItemSelect={(vent) => {
                        saveHistory();
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, middleVent: vent.id } });
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
                        saveHistory();
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, middleVent: undefined } });
                    }}
                />
            </ControlGroup>

            <ControlGroup fill>
                <VentSelect
                    fill
                    filterable={false}
                    disabled={!hasVents}
                    items={filteredVents}
                    itemRenderer={ventSelectRenderer}
                    onItemSelect={(vent) => {
                        saveHistory();
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, rightVent: vent.id } });
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
                        saveHistory();
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, rightVent: undefined } });
                    }}
                />
            </ControlGroup>
        </PanelContainer>
    );
}
