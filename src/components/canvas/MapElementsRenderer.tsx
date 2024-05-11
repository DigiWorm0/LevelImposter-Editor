import { useElementIDs } from "../../hooks/map/useMap";
import MapElement from "./MapElement";

export default function MapElementsRenderer() {
    const elementIDs = useElementIDs();

    return elementIDs.map(elementID => (
        <MapElement key={elementID} elementID={elementID} />
    ));
}