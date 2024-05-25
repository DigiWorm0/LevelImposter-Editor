import { Autocomplete, TextField, Tooltip } from "@mui/material";
import React from "react";
import { useElementValue } from "../../../../hooks/elements/useElements";
import { useSelectedElemValue } from "../../../../hooks/elements/useSelectedElem";
import { useElementType } from "../../../../hooks/elements/useTypes";
import { MaybeGUID } from "../../../../types/generic/GUID";
import LIElement from "../../../../types/li/LIElement";

export interface ElementSelectProps {
    nameFilter?: string;
    typeFilter?: string;
    allowSelected?: boolean;
    blacklistedIDs?: MaybeGUID[];
    whitelistedIDs?: MaybeGUID[];

    label?: string;
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

    return (
        <Tooltip
            title={filteredElems.length === 0 ? props.noElementsText : undefined}
            color={"error"}
        >
            <Autocomplete
                key={props.selectedID}
                fullWidth
                disablePortal
                options={filteredElems}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={filteredElems.length === 0 ? props.noElementsText : props.defaultText}
                        size={"small"}
                        label={props.label}
                        fullWidth
                    />
                )}
                value={currentElem}
                onChange={(_, elem) => {
                    if (elem)
                        props.onPick(elem);
                    else
                        props.onReset();
                }}
                getOptionLabel={(elem) => elem.name}
            />
        </Tooltip>
    );
}