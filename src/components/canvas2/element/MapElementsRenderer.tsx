import MapElement from "./MapElement";
import {useElementChildIDs} from "../../../hooks/elements/useElementChildIDs";
import MapElementError from "./MapElementError";
import ErrorBoundary from "../../utils/ErrorBoundary";
import useElementIDs from "../../../hooks/elements/useElementIDs";
import MapElementOverlays from "./MapElementOverlays";
import MapElementsRenderLayer from "./MapElementsRenderLayer";

export default function MapElementsRenderer() {
    // Element IDs that have no parent element
    const orphanElementIDs = useElementChildIDs(undefined);
    const allElementIDs = useElementIDs();

    return (
        <pixiContainer>
            {orphanElementIDs.map(id => (
                <ErrorBoundary
                    key={id}
                    fallback={<MapElementError elementID={id}/>}
                >
                    <MapElement elementID={id}/>
                </ErrorBoundary>
            ))}

            <MapElementsRenderLayer/>

            {allElementIDs.map(id => (
                <ErrorBoundary
                    key={id}
                    fallback={<MapElementError elementID={id}/>}
                >
                    <MapElementOverlays elementID={id}/>
                </ErrorBoundary>
            ))}
        </pixiContainer>
    );
}