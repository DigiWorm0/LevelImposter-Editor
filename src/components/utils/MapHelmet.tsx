import {mapAtom} from "@editor/state/documentStore";
import {Helmet} from "react-helmet";
import useIsSaved from "../../hooks/fileio/useIsSaved";
import {useAtomValue} from "jotai";

export default function MapHelmet() {
    const map = useAtomValue(mapAtom);
    const [isSaved] = useIsSaved();

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