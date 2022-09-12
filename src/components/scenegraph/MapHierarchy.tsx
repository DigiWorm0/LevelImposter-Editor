import { Menu, MenuDivider } from "@blueprintjs/core";
import { useElementChildren } from "../../hooks/jotai/useElements";
import MapButtons from "../dialogs/MapButtons";
import MapHierarchyElement from "./MapHierarchyElement";
import RootHierarchyElement from "./RootHierarchyElement";

export default function MapHierarchy() {
    const elementIDs = useElementChildren(undefined);

    return (
        <Menu
            style={{ backgroundColor: "transparent" }}>

            <RootHierarchyElement />

            {elementIDs.map((elemID) => (
                <MapHierarchyElement key={elemID} elementID={elemID} />
            ))}
            <MenuDivider />
            <MapButtons />
        </Menu>
    );
}