import MapAsset from "../../types/li/MapAsset";
import generateGUID from "../../utils/strings/generateGUID";
import store from "../../shared/store";
import {allAssetsAtom} from "../state/assetsStore";

export const createAsset = (type: string, blob: Blob) => {
    const newAsset: MapAsset = {
        id: generateGUID(),
        type,
        blob,
        url: URL.createObjectURL(blob),
    };

    const allAssets = store.get(allAssetsAtom);
    store.set(allAssetsAtom, [...allAssets, newAsset]);

    return newAsset;
};