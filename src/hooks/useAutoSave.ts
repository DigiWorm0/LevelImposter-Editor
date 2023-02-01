import Dexie, { Table } from 'dexie';
import React from 'react';

export interface AutoSaveMetaData {
    id?: number;
    name: string;
}

export interface AutoSaveData extends AutoSaveMetaData {
    mapJson: string;
}

export class AutoSaveDB extends Dexie {
    autoSaveData!: Table<AutoSaveData, number>;

    constructor() {
        super('AutoSaveDB');
        this.version(1).stores({
            autoSaveData: '++id, name, mapJson',
        });
    }
}

export const autoSaveDB = new AutoSaveDB();

// TODO: Fix this another time.
// For now, its doing more harm than good, so clear it on load.
export default function useAutoSave() {
    React.useEffect(() => {
        autoSaveDB.autoSaveData.clear().then(() => {
            console.log('Cleared auto saves');
        });
    }, []);

    return null;
}