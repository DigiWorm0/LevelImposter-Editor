import { Menu, MenuDivider } from "@blueprintjs/core";
import { useElementChildren } from "../../hooks/jotai/useElements";
import useCombos from "../../hooks/useCombos";
import MapButtons from "../dialogs/MapButtons";
import MapHierarchyElement from "./MapHierarchyElement";
import RootHierarchyElement from "./RootHierarchyElement";

export default function MapHierarchy() {
    const elementIDs = useElementChildren(undefined);
    const { handleKeyDown, handleKeyUp } = useCombos();

    return (
        <Menu
            style={{ backgroundColor: "transparent" }}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}>

            <RootHierarchyElement />

            {elementIDs.map((elemID) => (
                <MapHierarchyElement key={elemID} elementID={elemID} />
            ))}
            <MenuDivider />
            <MapButtons />
        </Menu>
    );
}