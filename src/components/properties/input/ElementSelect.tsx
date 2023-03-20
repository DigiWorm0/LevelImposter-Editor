import { Button } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import { useElementValue } from "../../../hooks/jotai/useElements";
import { useSelectedElemValue } from "../../../hooks/jotai/useSelectedElem";
import { useElementType } from "../../../hooks/jotai/useTypes";
import { MaybeGUID } from "../../../types/generic/GUID";
import LIElement from "../../../types/li/LIElement";
import ResettablePanelInput from "./ResettablePanelInput";

export interface ElementSelectProps {
    nameFilter?: string;
    typeFilter?: string;
    allowSelected?: boolean;
    blacklistedIDs?: MaybeGUID[];
    whitelistedIDs?: MaybeGUID[];

    noElementsText: string;
    defaultText: string;
    selectedID: MaybeGUID;
    onPick: (elem: LIElement) => void;
    onReset: () => void;
}

export default function ElementSelect(props: ElementSelectProps) {
    const selectedElem = useSelectedElemValue();
    const currentElem = useElementValue(props.selectedID);
    const elems = useElementType(props.typeFilter ?? "");
    const filteredElems = React.useMemo(() => {
        return props.whitelistedIDs ?
            elems.filter((e) => props.whitelistedIDs?.includes(e.id))
            :
            elems.filter((e) => e.name.includes(props.nameFilter ?? "")
                && (props.allowSelected || e.id !== selectedElem?.id)
                && !props.blacklistedIDs?.includes(e.id));
    }, [elems, props.nameFilter, props.allowSelected, selectedElem, props.blacklistedIDs]);

    const selectRenderer: ItemRenderer<LIElement> = (elem, props) => (
        <MenuItem2
            key={elem.id}
            text={elem.name}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus}
        />
    );

    return (
        <Tooltip2
            content={filteredElems.length === 0 ? props.noElementsText : undefined}
            disabled={filteredElems.length > 0}
            fill
            intent="danger"
        >
            <ResettablePanelInput
                onReset={props.onReset}
            >
                <Select2
                    fill
                    filterable={false}
                    items={filteredElems}
                    itemRenderer={selectRenderer}
                    onItemSelect={props.onPick}
                >
                    <Button
                        rightIcon="caret-down"
                        text={currentElem?.name ?? props.defaultText}
                        disabled={filteredElems.length === 0}
                        style={{
                            fontStyle: currentElem ? "normal" : "italic"
                        }}
                        fill
                    />
                </Select2>
            </ResettablePanelInput>
        </Tooltip2>
    );
}