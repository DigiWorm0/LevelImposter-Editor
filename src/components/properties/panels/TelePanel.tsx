import { Button } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import { useElementType } from "../../../hooks/jotai/useTypes";
import LIElement from "../../../types/li/LIElement";
import ResettablePanelInput from "../input/ResettablePanelInput";
import SwitchPanelInput from "../input/SwitchPanelInput";
import PanelContainer from "../util/PanelContainer";

export default function TelePanel() {
    const { t } = useTranslation();
    const teleElems = useElementType("util-tele");
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const teleConnection = React.useMemo(() => {
        return teleElems.find((e) => e.id === selectedElem?.properties.teleporter);
    }, [teleElems, selectedElem]);

    const filteredTeles = React.useMemo(() => {
        return teleElems.filter((elem) => elem.id !== selectedElem?.id && elem.properties.teleporter !== selectedElem?.id);
    }, [teleElems, selectedElem]);

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

    if (!selectedElem || selectedElem.type !== "util-tele")
        return null;

    return (
        <PanelContainer title={t("tele.title") as string}>
            <ResettablePanelInput
                onReset={() => {
                    setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, teleporter: undefined } });
                }}
            >
                <Select2
                    fill
                    filterable={false}
                    disabled={filteredTeles.length <= 0}
                    items={filteredTeles}
                    itemRenderer={teleSelectRenderer}
                    onItemSelect={(tele) => {
                        setSelectedElem({ ...selectedElem, properties: { ...selectedElem.properties, teleporter: tele.id } });
                    }}
                >
                    <Button
                        rightIcon="caret-down"
                        text={teleConnection ? teleConnection.name : "(No connection)"}
                        fill
                    />
                </Select2>
            </ResettablePanelInput>
            <SwitchPanelInput
                prop={"preserveOffset"}
                name={"tele.preserveOffset"}
                defaultValue={true}
                tooltip={"tele.preserveOffsetTooltip"}
            />
            <SwitchPanelInput
                prop={"isGhostEnabled"}
                name={"tele.ghostEnabled"}
                defaultValue={true}
                tooltip={"tele.ghostEnabledTooltip"}
            />
        </PanelContainer>
    );
}
