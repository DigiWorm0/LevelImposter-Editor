import MapElement from "./MapElement";
import {useElementChildIDs} from "@/hooks/elements/useElementChildIDs";
import MapElementError from "./MapElementError";
import ErrorBoundary from "../../utils/ErrorBoundary";

export default function MapElementsRenderer() {
    // TODO: Replace w/ scenes
    const orphanElementIDs = useElementChildIDs(undefined);

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
        </pixiContainer>
    );
}