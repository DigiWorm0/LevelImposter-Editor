import { Menu } from "@blueprintjs/core";
import { useElementChildren } from "../../hooks/jotai/useElements";
import { useElementIDs } from "../../hooks/jotai/useMap";
import MapButtons from "../dialogs/MapButtons";
import MapHierarchyElement from "./MapHierarchyElement";

export default function MapHierarchy() {
    const elementIDs = useElementChildren(undefined);

    return (
        <Menu style={{ backgroundColor: "transparent" }}>
            {elementIDs.map((elemID) => (
                <MapHierarchyElement key={elemID} elementID={elemID} />
            ))}
            <MapButtons />
        </Menu>
    );
}