import React from "react";
import useStore, { clearStore, clearStoreFor, getStore, putStore } from "./useStore";
import dbWrapper from "./dbWrapper";

/**
 * Acts as a react hook for an indexed db.
 * @param id - ID of the element
 * @param defaultValue - Default value of the element
 * @returns A react hook of the element
 */
export default function useAutosave<Type>(id: string, defaultValue: Type): [Type, (value: Type) => void, number] {
    const [data, saveData, version] = useStore(id, defaultValue);

    // Save Data
    const saveToStorage = (value: Type) => {
        saveData(value);
        dbWrapper.put(id, JSON.stringify(value));
        console.log(`Saved ${id} to indexed db`);
        console.log(JSON.stringify(value));
    }

    // Get Data
    React.useEffect(() => {
        const data = dbWrapper.get(id).then(data => {
            if (data) {
                saveData(JSON.parse(data.value));
            }
        });
    }, [id]);

    return [data, saveToStorage, version];
}


/**
 * Puts a new element into the indexedDB
 * @param id - ID of the element
 * @param value - Value of the element
 */
export function putAutosave<Type>(id: string, value: Type) {
    putStore(id, value);
    dbWrapper.put(id, JSON.stringify(value));
}

/**
 * Gets a value from store
 * @param id - ID of the element
 * @returns value in Local Storage
 */
export function getAutosave<Type>(id: string, defaultValue: Type): Type {
    return getStore(id, defaultValue);
}

/**
 * Removes all keys from the store
 */
export function clearAutosave() {
    dbWrapper.clear();
    clearStore();
}

export function clearAutosaveFor(id: string) {
    dbWrapper.delete(id);
    clearStoreFor(id);
}