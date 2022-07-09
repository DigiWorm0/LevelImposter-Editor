import React from "react";
import useStore from "./useStore";

/**
 * Acts as a react hook for a local storage.
 * @param id - ID of the element
 * @param defaultValue - Default value of the element
 * @returns A react hook of the element
 */
export default function useStorage<Type>(id: string, defaultValue: Type): [Type, (value: Type) => void, number] {
    const [data, saveData, version] = useStore(id, defaultValue);

    // Save Data
    const saveToStorage = (value: Type) => {
        saveData(value);
        localStorage.setItem(id, JSON.stringify(value));
    }

    // Get Data
    React.useEffect(() => {
        const data = localStorage.getItem(id);
        if (data) {
            saveData(JSON.parse(data));
        }
    }, [id]);

    return [data, saveToStorage, version];
}