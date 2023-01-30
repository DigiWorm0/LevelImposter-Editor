import React from 'react';
import Dexie, { Table } from 'dexie';
import { useMapValue, useSetMap } from './jotai/useMap';
import useToaster from './useToaster';
import { useTranslation } from 'react-i18next';
import useIsSaved from './jotai/useIsSaved';
import { useSettingsValue } from './jotai/useSettings';
import { useSaveHistory } from './jotai/useHistory';

const MAX_SAVE_COUNT = 3;
const MIN_SAVE_INTERVAL = 1000 * 60 * 10; // 10 minutes

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

export default function useAutoSave() {
    const map = useMapValue();
    const [lastTime, setLastTime] = React.useState(0);
    const { danger } = useToaster();
    const { t } = useTranslation();
    const [_, setIsSaved] = useIsSaved();
    const settings = useSettingsValue();

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
        setIsSaved(false);
        const time = Date.now();
        if (time - lastTime > MIN_SAVE_INTERVAL && map.elements.length > 0 && settings.autosave != false) {
            addSave();
            setLastTime(time);
        }
    }, [map, lastTime, addSave, setIsSaved]);

    React.useEffect(() => {
        if (settings.autosave == false) {
            autoSaveDB.autoSaveData.clear().then(() => {
                console.log('Cleared auto saves');
            });
        }
    }, [settings.autosave]);

    return null;
}

export function useAutoSaves() {
    const [autoSaves, setAutoSaves] = React.useState<AutoSaveMetaData[]>([]);
    const settings = useSettingsValue();

    React.useEffect(() => {
        // Set Auto Saves without loading the map data into memory
        autoSaveDB.autoSaveData
            .orderBy('id')
            .reverse()
            .toArray()
            .then((saves) => {
                setAutoSaves(saves.map((s) => ({ id: s.id, name: s.name })));
            });
    }, [settings.autosave]);

    return autoSaves;
}

export function useRevertAutoSave() {
    const setMap = useSetMap();
    const { success } = useToaster();
    const saveHistory = useSaveHistory();
    const { t } = useTranslation();

    const revertAutoSave = React.useCallback((autoSave: AutoSaveMetaData) => {
        console.log("Reverting to auto save", autoSave);
        autoSaveDB.autoSaveData.get(autoSave.id ?? 0).then((save) => {
            if (save) {
                setMap(JSON.parse(save.mapJson));
                saveHistory();
                success(t("autosave.reverted", { name: autoSave.name }) as string);
            }
        });
    }, [setMap]);

    return revertAutoSave;
}