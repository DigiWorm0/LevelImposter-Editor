import {Autocomplete, PopperPlacementType, TextField, Tooltip} from "@mui/material";
import React from "react";
import {useElementsOfType} from "@/hooks/elements/useElementsOfType";
import {MaybeGUID} from "@/shared/types/GUID";
import {useAtomValue} from "jotai";
import {selectedElementIDAtom} from "@editor/selection/stores/elementSelectionStore";
import {useElement} from "@/hooks/elements/useElement";
import {MapElement} from "@editor/document/types/MapDocument";

export interface ElementSelectProps {
    nameFilter?: string;
    typeFilter?: string;
    allowSelected?: boolean;
    blacklistedIDs?: MaybeGUID[];
    whitelistedIDs?: MaybeGUID[];
    placement?: PopperPlacementType;
    disablePortal?: boolean;
    disabled?: boolean;

    label?: string;
    noElementsText: string;
    defaultText: string;
    selectedID: MaybeGUID;
    onPick: (elem: MapElement) => void;
    onReset: () => void;
}

export default function ElementSelect(props: ElementSelectProps) {
    const selectedElemID = useAtomValue(selectedElementIDAtom);
    const currentElem = useElement(props.selectedID);
    const elems = useElementsOfType(props.typeFilter ?? "");
    const filteredElems = React.useMemo(() => {
        return props.whitelistedIDs ?
            elems.filter((e) => props.whitelistedIDs?.includes(e.id))
            :
            elems.filter((e) => e.name?.includes(props.nameFilter ?? "")
                && (props.allowSelected || e.id !== selectedElemID)
                && !props.blacklistedIDs?.includes(e.id));
    }, [elems, props.nameFilter, props.allowSelected, selectedElemID, props.blacklistedIDs]);

    return (
        <Tooltip
            title={filteredElems.length === 0 ? props.noElementsText : undefined}
            color={"error"}
        >
            <span>
                <Autocomplete
                    key={props.selectedID}
                    fullWidth
                    disablePortal={props.disablePortal ?? true}
                    options={filteredElems}
                    disabled={(filteredElems.length === 0 && !currentElem) || props.disabled}
                    componentsProps={{
                        popper: {
                            placement: props.placement
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={props.defaultText}
                            size={"small"}
                            label={props.label}
                            fullWidth
                        />
                    )}
                    value={currentElem}
                    style={{marginTop: 5, marginBottom: 5}}
                    onChange={(_, elem) => {
                        if (elem)
                            props.onPick(elem);
                        else
                            props.onReset();
                    }}
                    getOptionKey={(elem) => elem.id}
                    getOptionLabel={(elem) => elem.name ?? ""}
                />
            </span>
        </Tooltip>
    );
}