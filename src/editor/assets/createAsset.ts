import generateGUID from "../../utils/strings/generateGUID";
import store from "../../shared/store";
import {allAssetsAtom, MapAsset} from "./assetsStore";

export const createAsset = (type: string, blob: Blob) => {
    return registerAsset({
        id: generateGUID(),
        type,
        blob,
        url: URL.createObjectURL(blob),
    });
};

export const registerAsset = (mapAsset: MapAsset) => {
    const allAssets = store.get(allAssetsAtom);
    store.set(allAssetsAtom, [...allAssets, mapAsset]);
    return mapAsset;
};