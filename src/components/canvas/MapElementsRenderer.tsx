import { useElementIDs } from "../../hooks/jotai/useMap";
import MapElement from "./MapElement";

export default function MapElementsRenderer() {
    const elementIDs = useElementIDs();

    return elementIDs.map(elementID => (
        <MapElement key={elementID} elementID={elementID} />
    ));
}