import { useMapValue } from "../../hooks/jotai/useMap";
import { Helmet } from "react-helmet";
import isDefaultName from "../../hooks/isDefaultMapName";
import useIsSaved from "../../hooks/jotai/useIsSaved";

export default function MapHelmet() {
    const map = useMapValue();
    const [isSaved] = useIsSaved();

    return (
        <Helmet>
            {!isDefaultName(map.name) &&
                <title>{map.name}{isSaved ? "" : " *"}</title>
            }
            <meta name="description" content={map.description} />
        </Helmet>
    );
}