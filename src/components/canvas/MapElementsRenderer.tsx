import MapElement from "./MapElement";
import ErrorBoundary from "../utils/ErrorBoundary";
import MapElementError from "./MapElementError";
import {useElementChildIDs} from "../../hooks/elements/useElementChildIDs";

export default function MapElementsRenderer() {
    const elementIDs = useElementChildIDs(undefined);

    return elementIDs.map(elementID => (
        <ErrorBoundary fallback={<MapElementError elementID={elementID}/>} key={elementID}>
            <MapElement elementID={elementID}/>
        </ErrorBoundary>
    ));
}