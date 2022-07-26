import React from "react";
import GUID from "../types/generic/GUID";
import { MaybeLIElement } from "../types/li/LIElement";
import generateGUID from "./generateGUID";
import { useAddElementAtMouse, useRemoveElement } from "./jotai/useElement";
import { useSelectedElemValue, useSetSelectedElemID } from "./jotai/useSelectedElem";

export default function useComboHandles() {
    const [clipboard, setClipboard] = React.useState<MaybeLIElement>(undefined);
    const selectedElem = useSelectedElemValue();
    const setSelectedID = useSetSelectedElemID();
    const removeElement = useRemoveElement();
    const addElement = useAddElementAtMouse();

    const onDelete = () => {
        if (selectedElem) {
            removeElement(selectedElem.id);
            setSelectedID("" as GUID);
        }
    }

    const onCopy = () => {
        if (selectedElem) {
            setClipboard(selectedElem);
        }
    }

    const onCut = () => {
        if (selectedElem) {
            setClipboard(selectedElem);
            removeElement(selectedElem.id);
            setSelectedID("" as GUID);
        }
    }

    const onPaste = () => {
        if (clipboard) {
            const newID = generateGUID();
            addElement({
                ...clipboard,
                id: newID,
            });
            setSelectedID(newID);
        }
    }

    return [
        onDelete,
        onCopy,
        onPaste,
        onCut
    ];
}