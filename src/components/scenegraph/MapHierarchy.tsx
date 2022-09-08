import { Menu, MenuDivider } from "@blueprintjs/core";
import { useLayerElementIDs, useSelectedLayerValue } from "../../hooks/jotai/useLayer";
import useTranslation from "../../hooks/useTranslation";
import MapButtons from "../dialogs/MapButtons";
import MapHierarchyElement from "./MapHierarchyElement";

export default function MapHierarchy() {
    const elementIDs = useLayerElementIDs();
    const translation = useTranslation();
    const selectedLayer = useSelectedLayerValue();

    return (
        <Menu>
            <MenuDivider />
            <h3 style={{ textAlign: "center" }}>{selectedLayer ? selectedLayer.name : translation.AllElements}</h3>
            {elementIDs.map((elemID) => (
                <MapHierarchyElement key={elemID} elementID={elemID} />
            ))}
            <MapButtons />
        </Menu>
    );
}