import MapElement from "./MapElement";
import {useElementChildIDs} from "../../../hooks/elements/useElementChildIDs";

export default function MapElementsRenderer() {
    const elementIDs = useElementChildIDs(undefined);

    return elementIDs.map(id => (
        <MapElement
            key={id}
            elementID={id}
        />
    ));
}