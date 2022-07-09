import EventEmitter from "eventemitter3";
import React from "react";

const eventEmitter = new EventEmitter();
const store: Record<string, any> = {};

/**
 * Acts as a react hook for a global store.
 * @param id - ID of the element
 * @param defaultValue - Default value of the element
 * @returns A react hook of the element
 */
export default function useStore<Type>(id: string, defaultValue: Type): [Type, (value: Type) => void, number] {
    const [version, setVersion] = React.useState(0);
    const [data, setData] = React.useState(defaultValue);

    // Get Data
    React.useEffect(() => {
        const data = getStore(id, defaultValue);
        setData(data);
    }, [id, version, defaultValue]);

    // Save Data
    const saveData = (value: Type) => {
        putStore(id, value);
    }

    // Listen for changes
    React.useEffect(() => {
        const handleDataChange = () => {
            setVersion(v => v + 1);
        }

        eventEmitter.addListener(id, handleDataChange);
        return () => {
            eventEmitter.removeListener(id, handleDataChange);
        };
    }, [id, setVersion]);

    return [data, saveData, version];
}

/**
 * Acts as a react hook for multiple global stores.
 * @param ids - ID of the elements
 * @param defaultValue - Default value of the element
 * @returns A react hook of the element
 */
export function useStores<Type>(ids: string[], defaultValue: Type): [Type[], (values: Type[]) => void, number] {
    const [version, setVersion] = React.useState(0);
    const [data, setData] = React.useState([] as Type[]);

    // Get Data
    React.useEffect(() => {
        setData(ids.map((id, index) => getStore(id, defaultValue)));
    }, [ids, version, defaultValue, setData]);

    // Save Data
    const saveData = (values: Type[]) => {
        ids.forEach((id, index) => {
            putStore(id, values[index]);
        });
    }

    // Listen for changes
    React.useEffect(() => {
        const handleDataChange = () => {
            setVersion(v => v + 1);
        }

        ids.forEach(id => {
            eventEmitter.addListener(id, handleDataChange);
        });

        return () => {
            ids.forEach(id => {
                eventEmitter.removeListener(id, handleDataChange);
            });
        };
    }, [ids, setVersion]);

    return [data, saveData, version];
}

/**
 * Puts a new element into the store
 * @param id - ID of the element
 * @param value - Value of the element
 */
export function putStore<Type>(id: string, value: Type) {
    store[id] = value;
    eventEmitter.emit(id);
}

/**
 * Gets a value from store
 * @param id - ID of the element
 * @returns value in Local Storage
 */
export function getStore<Type>(id: string, defaultValue: Type): Type {
    return id in store ? store[id] as Type : defaultValue;
}

/**
 * Removes all keys from the store
 */
export function clearStore() {
    const keys = store.keys();
    for (let key of keys) {
        eventEmitter.emit(key);
        delete store[key];
    }
}

export function clearStoreFor(id: string) {
    delete store[id];
    eventEmitter.emit(id);
}