import { Menu, MenuDivider } from "@blueprintjs/core";
import { useElementIDs } from "../../hooks/jotai/useMap";
import AddObjectButton from "../dialogs/AddObjectButton";
import MapHierarchyElement from "./MapHierarchyElement";

export default function MapHierarchy() {
    const elementIDs = useElementIDs();

    return (
        <Menu>
            <MenuDivider />
            <h3 style={{ textAlign: "center" }}>Elements</h3>
            {elementIDs.map((elemID) => (
                <MapHierarchyElement key={elemID} elementID={elemID} />
            ))}
            <AddObjectButton isSidePanel={true} />
        </Menu>
    );
}