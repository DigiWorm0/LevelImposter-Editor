import MapElement from "./MapElement";
import {useElementChildIDs} from "../../../hooks/elements/useElementChildIDs";
import MapElementError from "../../canvas/MapElementError";
import ErrorBoundary from "../../utils/ErrorBoundary";

export default function MapElementsRenderer() {
    const elementIDs = useElementChildIDs(undefined);

    return elementIDs.map(id => (
        <ErrorBoundary
            key={id}
            fallback={<MapElementError elementID={id}/>}
        >
            <MapElement elementID={id}/>
        </ErrorBoundary>
    ));
}