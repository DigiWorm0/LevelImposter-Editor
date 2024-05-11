import { useMapValue } from "../../hooks/map/useMap";
import { Helmet } from "react-helmet";
import useIsSaved from "../../hooks/fileio/useIsSaved";

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