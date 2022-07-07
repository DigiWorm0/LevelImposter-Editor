import GUID from '../types/generic/GUID';
import useStorage, { getStorage, putStorage } from './useStorage';

const CURRENT_KEY = 'collider-editing';
const DEFAULT_EDITING = { editingID: "" as GUID };

interface EditingState {
    editingID: GUID;
}

export default function useColliderEditing(): [GUID, (editingID?: GUID) => void] {
    const [editingID, setEditingID] = useStorage<EditingState>(CURRENT_KEY, DEFAULT_EDITING);
    const setData = (id?: GUID) => {
        setEditingID({ editingID: id ? id : "" as GUID });
    }
    return [editingID.editingID, setData];
}

export function getColliderEditing() {
    return getStorage<EditingState>(CURRENT_KEY, DEFAULT_EDITING).editingID;
}

export function setColliderEditing(editingID: GUID) {
    putStorage(CURRENT_KEY, { editingID: editingID });
}