import MapElementError from "./MapElementError";
import ErrorBoundary from "../../utils/ErrorBoundary";
import useElementIDs from "../../../hooks/elements/useElementIDs";
import MapElementOverlays from "./MapElementOverlays";
import usePlayheadTicker from "../../../hooks/timeline/usePlayheadTicker";

export default function MapElementOverlaysRenderer() {
    const allElementIDs = useElementIDs();
    usePlayheadTicker();

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