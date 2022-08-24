import { Menu } from "@blueprintjs/core";
import { useElementIDs } from "../../hooks/jotai/useMap";
import MapHierarchyElement from "./MapHierarchyElement";

export default function MapHierarchy() {
    const elementIDs = useElementIDs();

    return (
        <div className="map-hierarchy">
            <Menu>
                {elementIDs.map((elemID) => (
                    <MapHierarchyElement key={elemID} elementID={elemID} />
                ))}
            </Menu>
        </div>
    );
}