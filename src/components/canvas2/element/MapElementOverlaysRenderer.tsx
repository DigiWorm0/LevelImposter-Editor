import MapElementError from "./MapElementError";
import ErrorBoundary from "../../utils/ErrorBoundary";
import useElementIDs from "../../../hooks/elements/useElementIDs";
import MapElementOverlays from "./MapElementOverlays";

export default function MapElementOverlaysRenderer() {
    const allElementIDs = useElementIDs();

    return (
        <pixiContainer>
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