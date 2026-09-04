import {documentAtom} from "@editor/document/documentStore";
import useMapThumbnailURL from "@editor/firebase/hooks/useMapThumbnailURL";
import {useAtomValue} from "jotai";

export default function PublishModalUploadPreview() {
    const map = useAtomValue(documentAtom);
    const thumbnailURL = useMapThumbnailURL();

    // TODO: FIX ME!
    return null;
    // return (
    //     <MapCard
    //         map={{
    //             ...map,
    //             thumbnailURL
    //         }}
    //     />
    // );
}