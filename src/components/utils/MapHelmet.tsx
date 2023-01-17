import { useMapValue } from "../../hooks/jotai/useMap";
import { Helmet } from "react-helmet";
import isDefaultName from "../../hooks/isDefaultMapName";
import useIsSaved from "../../hooks/jotai/useIsSaved";

export default function MapHelmet() {
    const map = useMapValue();
    const [isSaved] = useIsSaved();

    return (
        <Helmet>
            {map.elements.length > 0 ?
                (<title>{map.name}{isSaved ? "" : "*"}</title>)
                :
                (<title>LevelImposter Editor</title>)
            }
            <meta name="description" content={map.description} />
        </Helmet>
    );
}