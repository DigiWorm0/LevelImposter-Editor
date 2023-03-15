import React from "react";
import { Button, FormGroup } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import { useElementType } from "../../../hooks/jotai/useTypes";
import LIElement from "../../../types/li/LIElement";
import ResettablePanelInput from "./ResettablePanelInput";

export default function VentSelect(props: { prop: "leftVent" | "middleVent" | "rightVent" }) {
    const { t } = useTranslation();
    const ventElemsA = useElementType("util-vent1");
    const ventElemsB = useElementType("util-vent2");
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const ventElems = React.useMemo(() => ventElemsA.concat(ventElemsB), [ventElemsA, ventElemsB]);


    const leftVent = React.useMemo(() => ventElems.find((e) => e.id === selectedElem?.properties.leftVent), [selectedElem, ventElems]);
    const middleVent = React.useMemo(() => ventElems.find((e) => e.id === selectedElem?.properties.middleVent), [selectedElem, ventElems]);
    const rightVent = React.useMemo(() => ventElems.find((e) => e.id === selectedElem?.properties.rightVent), [selectedElem, ventElems]);
    const filteredVents = React.useMemo(
        () => {
            return ventElems.filter((elem) =>
                elem.id !== selectedElem?.id &&
                leftVent?.id !== elem.id &&
                middleVent?.id !== elem.id &&
                rightVent?.id !== elem.id);
        },
        [leftVent, middleVent, rightVent, selectedElem, ventElems]);

    const hasVents = React.useMemo(() => filteredVents.length > 0, [filteredVents]);

    const ventSelectRenderer: ItemRenderer<LIElement> = (elem, props) => (
        <MenuItem2
            key={elem.type + props.index}
            text={elem.name}
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
                content={!hasVents ? t("vent.errorNoVents") as string : undefined}
                disabled={hasVents}
                fill
                intent="danger"
            >

                <ResettablePanelInput
                    onReset={() => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, [props.prop]: undefined } });
                    }}
                >
                    <Select2
                        fill
                        filterable={false}
                        disabled={!hasVents}
                        items={filteredVents}
                        itemRenderer={ventSelectRenderer}
                        onItemSelect={(vent) => {
                            setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, [props.prop]: vent.id } });
                        }}
                        popoverProps={{ minimal: true }}
                    >

                        <Button
                            rightIcon="caret-down"
                            text={
                                selectedElem.properties[props.prop] ?
                                    ventElems.find((e) => e.id === selectedElem.properties[props.prop])?.name :
                                    t("vent.noConnection") as string
                            }
                            style={{
                                fontStyle: selectedElem.properties[props.prop] ? "normal" : "italic",
                            }}
                            fill
                            disabled={!hasVents}
                        />
                    </Select2>
                </ResettablePanelInput>
            </Tooltip2>
        </FormGroup>
    )
}