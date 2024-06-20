import MapElement from "./MapElement";
import useElementIDs from "../../hooks/elements/useElementIDs";
import ErrorBoundary from "../utils/ErrorBoundary";
import MapElementError from "./MapElementError";

export default function MapElementsRenderer() {
    const elementIDs = useElementIDs();

    return elementIDs.map(elementID => (
        <ErrorBoundary fallback={<MapElementError elementID={elementID} />} key={elementID}>
            <MapElement elementID={elementID} />
        </ErrorBoundary>
    ));
}