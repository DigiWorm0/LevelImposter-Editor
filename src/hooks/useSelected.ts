import GUID from '../types/generic/GUID';
import useStorage, { getStorage, putStorage } from './useStorage';

const CURRENT_KEY = 'selected';
const DEFAULT_SELECTED = { selectedID: "" as GUID };

interface SelectionState {
    selectedID: GUID;
}

export default function useSelected(): [GUID, (selectedID?: GUID) => void] {
    const [selectedID, setSelectedID] = useStorage<SelectionState>(CURRENT_KEY, DEFAULT_SELECTED);
    const setData = (id?: GUID) => {
        setSelectedID({ selectedID: id ? id : "" as GUID });
        console.log(id);
    }
    return [selectedID.selectedID, setData];
}

export function getSelection() {
    return getStorage<SelectionState>(CURRENT_KEY, DEFAULT_SELECTED).selectedID;
}

export function setSelection(selectedID: GUID) {
    putStorage(CURRENT_KEY, { selectedID: selectedID });
}