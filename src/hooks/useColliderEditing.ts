import GUID from '../types/generic/GUID';
import useStore, { getStore, putStore } from './storage/useStore';

const CURRENT_KEY = 'collider-editing';
const DEFAULT_EDITING = { editingID: "" as GUID };

interface EditingState {
    editingID: GUID;
}

export default function useColliderEditing(): [GUID, (editingID?: GUID) => void] {
    const [editingID, setEditingID] = useStore<EditingState>(CURRENT_KEY, DEFAULT_EDITING);
    const setData = (id?: GUID) => {
        setEditingID({ editingID: id ? id : "" as GUID });
    }
    return [editingID.editingID, setData];
}

export function getColliderEditing() {
    return getStore<EditingState>(CURRENT_KEY, DEFAULT_EDITING).editingID;
}

export function setColliderEditing(editingID: GUID) {
    putStore(CURRENT_KEY, { editingID: editingID });
}