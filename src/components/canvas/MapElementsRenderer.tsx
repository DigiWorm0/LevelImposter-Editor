import MapElement from "./MapElement";
import useElementIDs from "../../hooks/elements/useElementIDs";

export default function MapElementsRenderer() {
    const elementIDs = useElementIDs();

    return elementIDs.map(elementID => (
        <MapElement key={elementID} elementID={elementID} />
    ));
}