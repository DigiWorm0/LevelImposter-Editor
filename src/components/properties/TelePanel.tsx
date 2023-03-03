import { Button, ControlGroup, Switch } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useElementType } from "../../hooks/jotai/useTypes";
import LIElement from "../../types/li/LIElement";
import PanelContainer from "./PanelContainer";

const TeleSelect = Select2.ofType<LIElement>();

export default function TelePanel() {
    const { t } = useTranslation();
    const teleElems = useElementType("util-tele");
    const [selectedElem, setSelectedElem] = useSelectedElem();

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
        <PanelContainer title={t("tele.title") as string}>
            <ControlGroup fill>
                <TeleSelect
                    fill
                    filterable={false}
                    disabled={!hasTeles}
                    items={filteredTeles}
                    itemRenderer={teleSelectRenderer}
                    onItemSelect={(tele) => {
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
                    rightIcon="refresh"
                    onClick={() => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, teleporter: undefined } });
                    }}
                />
            </ControlGroup>
            <Tooltip2
                fill
                content={t("tele.preserveOffsetTooltip") as string}>

                <Switch
                    label={t("tele.preserveOffset") as string}
                    checked={selectedElem.properties.preserveOffset !== false}
                    style={{ textAlign: "center", marginTop: 5, marginBottom: 10 }}
                    onChange={(e) => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, preserveOffset: e.currentTarget.checked } });
                    }}
                />

            </Tooltip2>
        </PanelContainer>
    );
}
