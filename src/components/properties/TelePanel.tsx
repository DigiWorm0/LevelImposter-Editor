import { Button, ControlGroup } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useElementType } from "../../hooks/jotai/useTypes";
import useTranslation from "../../hooks/useTranslation";
import LIElement from "../../types/li/LIElement";
import PanelContainer from "./PanelContainer";

const TeleSelect = Select2.ofType<LIElement>();

export default function TelePanel() {
    const translation = useTranslation();
    const teleElems = useElementType("util-tele");
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const saveHistory = useSaveHistory();

    const teleConnection = teleElems.find((e) => e.id === selectedElem?.properties.teleporter);
    const filteredTeles = teleElems.filter((elem) => elem.id !== selectedElem?.id && elem.properties.teleporter !== selectedElem?.id);

    const teleSelectRenderer: ItemRenderer<LIElement> = (elem, props) => (
        <MenuItem2
            key={elem.type + props.index}
            text={elem.name}
            label={elem.type}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    const hasTeles = filteredTeles.length >= 1;

    if (!selectedElem || selectedElem.type !== "util-tele")
        return null;

    return (
        <PanelContainer title={translation.Teleporter}>
            <ControlGroup fill>
                <TeleSelect
                    fill
                    filterable={false}
                    disabled={!hasTeles}
                    items={filteredTeles}
                    itemRenderer={teleSelectRenderer}
                    onItemSelect={(tele) => {
                        saveHistory();
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, teleporter: tele.id } });
                    }}>

                    <Button
                        rightIcon="caret-down"
                        text={teleConnection ? teleConnection.name : "(No connection)"}
                        fill
                    />
                </TeleSelect>
                <Button
                    minimal
                    rightIcon="cross"
                    onClick={() => {
                        saveHistory();
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, teleporter: undefined } });
                    }}
                />
            </ControlGroup>
        </PanelContainer>
    );
}
