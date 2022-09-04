import { Menu, MenuDivider } from "@blueprintjs/core";
import useSelectedLayer, { useSelectedLayerValue } from "../../hooks/jotai/useLayer";
import { useElementIDs } from "../../hooks/jotai/useMap";
import useTranslation from "../../hooks/useTranslation";
import MapButtons from "../dialogs/MapButtons";
import MapHierarchyElement from "./MapHierarchyElement";

export default function MapHierarchy() {
    const elementIDs = useElementIDs();
    const translation = useTranslation();
    const selectedLayer = useSelectedLayerValue();

    return (
        <Menu>
            <MenuDivider />
            <h3 style={{ textAlign: "center" }}>{selectedLayer ? selectedLayer.name : translation.Elements}</h3>
            {elementIDs.map((elemID) => (
                <MapHierarchyElement key={elemID} elementID={elemID} />
            ))}
            <MapButtons />
        </Menu>
    );
}