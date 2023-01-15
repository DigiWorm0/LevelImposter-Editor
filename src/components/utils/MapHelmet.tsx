import { useMapValue } from "../../hooks/jotai/useMap";
import { Helmet } from "react-helmet";
import isDefaultName from "../../hooks/isDefaultMapName";

export default function MapHelmet() {
    const map = useMapValue();

    return (
        <Helmet>
            {!isDefaultName(map.name) && <title>{map.name}</title>}
            <meta name="description" content={map.description} />
        </Helmet>
    );
}