import {isDocumentSavedAtom, mapAtom} from "@editor/state/documentStore";
import {Helmet} from "react-helmet";
import {useAtomValue} from "jotai";

export default function MapHelmet() {
    const map = useAtomValue(mapAtom);
    const isSaved = useAtomValue(isDocumentSavedAtom);

    return (
        <Helmet>
            {map.elements.length > 0 ?
                (<title>{map.name}{isSaved ? "" : "*"}</title>)
                :
                (<title>LevelImposter Editor</title>)
            }
            <meta name="description" content={map.description}/>
        </Helmet>
    );
}