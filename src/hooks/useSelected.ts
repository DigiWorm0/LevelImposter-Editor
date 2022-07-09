import GUID from '../types/generic/GUID';
import useStore, { getStore, putStore } from './storage/useStore';

const CURRENT_KEY = 'selected';
const DEFAULT_SELECTED = { selectedID: "" as GUID };

interface SelectionState {
    selectedID: GUID;
}

export default function useSelected(): [GUID, (selectedID?: GUID) => void] {
    const [selectedID, setSelectedID] = useStore<SelectionState>(CURRENT_KEY, DEFAULT_SELECTED);
    const setData = (id?: GUID) => {
        setSelectedID({ selectedID: id ? id : "" as GUID });
    }
    return [selectedID.selectedID, setData];
}

export function getSelection() {
    return getStore<SelectionState>(CURRENT_KEY, DEFAULT_SELECTED).selectedID;
}

export function setSelection(selectedID: GUID) {
    putStore(CURRENT_KEY, { selectedID: selectedID });
}