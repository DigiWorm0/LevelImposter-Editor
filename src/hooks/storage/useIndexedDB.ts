import React from "react";
import dbWrapper from "./dbWrapper";
import useStore, { clearStore, clearStoreFor, getStore, inStore, putStore, useStores } from "./useStore";

const loadingList: string[] = [];

/**
 * Acts as a react hook for an indexed db.
 * @param id - ID of the element
 * @param defaultValue - Default value of the element
 * @returns A react hook of the element
 */
export default function useAutosave<Type>(id: string, defaultValue: Type): [Type, (value: Type) => void, number] {
    const [data, setData, version] = useStore(id, defaultValue);

    // Save Data
    const saveToStorage = (value: Type) => {
        setData(value);
        dbWrapper.put(id, JSON.stringify(value));
        console.log(`%cSaved ${id} to db`, "color:lime; font-weight: bold;");
    }

    // Get Data
    React.useEffect(() => {
        if (!inStore(id) && !loadingList.includes(id)) {
            console.log("%cLoading " + id + " from db", "color:orange; font-weight: bold;");
            loadingList.push(id);
            dbWrapper.get(id).then(dbData => {
                loadingList.splice(loadingList.indexOf(id), 1);
                if (dbData) {
                    setData(JSON.parse(dbData.value));
                    console.log(`%cLoaded ${id} from db`, "color:green; font-weight: bold;");
                }
            }).catch(err => {
                console.error(err);
                loadingList.splice(loadingList.indexOf(id), 1);
            });
        }
    }, [id]);

    return [data, saveToStorage, version];
}

export function useAutosaves<Type>(ids: string[], defaultValue: Type): [Type[], (value: Type[]) => void, number] {
    const [data, setData, version] = useStores(ids, defaultValue);

    // Save Data
    const saveToStorage = (values: Type[]) => {
        setData(values);
        ids.forEach((id, index) => {
            dbWrapper.put(id, JSON.stringify(values[index]));
        });
        console.log(`%cSaved ${ids} to db`, "color:lime; font-weight: bold;");
    }

    // Get Data
    React.useEffect(() => {
        ids.forEach((id, index) => {
            if (!inStore(id) && !loadingList.includes(id)) {
                console.log("%cLoading " + id + " from db", "color:orange; font-weight: bold;");
                loadingList.push(id);
                dbWrapper.get(id).then(dbData => {
                    loadingList.splice(loadingList.indexOf(id), 1);
                    if (dbData) {
                        data[index] = JSON.parse(dbData.value);
                        setData(data);
                        console.log(`%cLoaded ${id} from db`, "color:green; font-weight: bold;");
                    }
                }).catch(err => {
                    console.error(err);
                    loadingList.splice(loadingList.indexOf(id), 1);
                });
            }
        }, [ids]);
    }, [ids]);

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
    console.log(`%cSaved ${id} directly to db`, "color:red; font-weight: bold;");
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
    console.log(`%cCleared db`, "color:red; font-weight: bold;");
    dbWrapper.clear();
    clearStore();
}

export function clearAutosaveFor(id: string) {
    console.log(`%cCleared ${id} from db`, "color:red; font-weight: bold;");
    dbWrapper.delete(id);
    clearStoreFor(id);
}