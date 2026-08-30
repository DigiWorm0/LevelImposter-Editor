import {documentAtom, isDocSavedAtom} from "@editor/document/documentStore";
import {Helmet} from "react-helmet";
import {useAtomValue} from "jotai";

export default function MapHelmet() {
    const map = useAtomValue(documentAtom);
    const isSaved = useAtomValue(isDocSavedAtom);

    return (
        <Helmet>
            <title>{map.name}{isSaved ? "" : "*"}</title>
            <meta name="description" content={map.properties.description}/>
        </Helmet>
    );
}