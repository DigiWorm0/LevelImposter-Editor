import EventEmitter from "eventemitter3";
import React from "react";

const eventEmitter = new EventEmitter();

export let storageCache: Record<string, any> = {};

/**
 * Acts as a react hook for Local Storage
 * @param id - ID of the element
 * @param defaultValue - Default value of the element
 * @returns A react hook of the element
 */
export default function useStorage<Type>(id: string, defaultValue: Type): [Type, (value: Type) => void] {
    const [version, setVersion] = React.useState(0);
    const [data, setData] = React.useState(defaultValue);

    // Get Data
    React.useEffect(() => {
        setData(getStorage(id, defaultValue));
    }, [id, version, defaultValue, setData]);

    // Save Data
    const saveData = (value: Type) => {
        putStorage(id, value);
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

    return [data, saveData];
}

/**
 * Puts a new element into Local Storage
 * @param id - ID of the element
 * @param value - Value of the element
 */
export function putStorage<Type>(id: string, value: Type) {
    storageCache[id] = value;
    const jsonData = JSON.stringify(value);
    localStorage.setItem(id, jsonData);
    eventEmitter.emit(id);
}

/**
 * Gets a value from Local Storage
 * @param id - ID of the element
 * @returns value in Local Storage
 */
export function getStorage<Type>(id: string, defaultValue: Type): Type {
    if (id in storageCache)
        return storageCache[id] as Type;

    const jsonData = localStorage.getItem(id);
    const value = jsonData ? (JSON.parse(jsonData) as Type) : defaultValue;
    storageCache[id] = value;
    return value;
}

/**
 * Removes all keys from Local Storage
 */
export function clearStorage() {
    storageCache = {};
    const keys = localStorage.getAllKeys();
    for (let key of keys) {
        localStorage.removeItem(key);
        eventEmitter.emit(key);
    }
}