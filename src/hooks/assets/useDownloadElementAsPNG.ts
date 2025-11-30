// Trim Assets
import {atom, useSetAtom} from "jotai";
import saveFileFromURL from "../../utils/fileio/saveFileFromURL";
import {elementAsImageBlobAtom} from "../canvas/sprite/useElementAsImageBlob";
import {MaybeGUID} from "../../types/common/GUID";
import {elementAtomFamily} from "../elements/useElements";


// Atom
export const downloadElementAsPNGAtom = atom(null, async (get, _, id: MaybeGUID) => {

    // Get Element
    const element = get(elementAtomFamily(id));
    if (!element)
        return;

    // Convert DDS to PNG
    const imageBlob = await get(elementAsImageBlobAtom(id));
    if (!imageBlob)
        return;

    // Download Asset
    const fileName = `${element.name}.png`;
    saveFileFromURL(URL.createObjectURL(imageBlob), fileName);
    URL.revokeObjectURL(fileName);
});

// Hooks
export default function useDownloadElementAsPNG() {
    return useSetAtom(downloadElementAsPNGAtom);
}