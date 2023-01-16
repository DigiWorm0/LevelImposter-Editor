import React from 'react';
import Dexie, { Table } from 'dexie';
import { useMapValue } from './jotai/useMap';
import useToaster from './useToaster';
import { useTranslation } from 'react-i18next';

const MAX_SAVE_COUNT = 5;
const MIN_SAVE_INTERVAL = 1000 * 60 * 5; // 5 minutes

export interface AutoSaveData {
    id?: number;
    name: string;
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

export default function useAutoSave() {
    const map = useMapValue();
    const [lastTime, setLastTime] = React.useState(0);
    const { danger } = useToaster();
    const { t } = useTranslation();

    const addSave = React.useCallback(() => {
        try {
            const saveName = map.name + ' - ' + new Date().toLocaleString();
            const saveData: AutoSaveData = {
                name: saveName,
                mapJson: JSON.stringify(map),
            };

            autoSaveDB.autoSaveData.add(saveData).then(() => {
                console.log(`Saved auto-save: ${saveName}`);
            });

            autoSaveDB.autoSaveData
                .orderBy('id')
                .reverse()
                .offset(MAX_SAVE_COUNT)
                .delete()
                .then((count) => {
                    if (count > 0)
                        console.log(`Deleted ${count} auto save(s)`);
                });
        }
        catch (e: any) {
            danger(t('errorAutoSave', { error: e.message }));
        }
    }, [map]);

    React.useEffect(() => {
        const time = Date.now();
        if (time - lastTime > MIN_SAVE_INTERVAL && map.elements.length > 0) {
            addSave();
            setLastTime(time);
        }
    }, [map, lastTime, addSave]);

    return null;
}

export function useAutoSaves() {
    const [autoSaves, setAutoSaves] = React.useState<AutoSaveData[]>([]);

    React.useEffect(() => {
        autoSaveDB.autoSaveData
            .orderBy('id')
            .reverse()
            .toArray()
            .then((data) => {
                setAutoSaves(data);
            });
    }, []);

    return autoSaves;
}