import { IconName, Tree, TreeNodeInfo } from "@blueprintjs/core";
import React from "react";
import { useMapValue } from "../../hooks/jotai/useMap";
import { useSelectedElemID } from "../../hooks/jotai/useSelectedElem";
import GUID from "../../types/generic/GUID";
import LIElement from "../../types/li/LIElement";

export default function MapHierarchy() {
    const map = useMapValue();
    const [selectedID, setSelectedID] = useSelectedElemID();

    const getNode = (elem: LIElement, index: number): (TreeNodeInfo | undefined) => {
        return {
            id: elem.id + "-" + index,
            label: elem.name,
            icon: getIcon(elem.type),
            isSelected: elem.id === selectedID,
            nodeData: elem.id,
        };
    }

    const getIcon = (type: string): IconName => {
        let icon: IconName = "cube";
        if (type === "util-blank")
            icon = "media";
        else if (type.startsWith("task-"))
            icon = "build";
        else if (type.startsWith("sab-"))
            icon = "warning-sign";
        else if (type === "util-minimap")
            icon = "map";
        else if (type === "util-cam")
            icon = "camera";
        else if (type === "util-dummy")
            icon = "person";
        else if (type.startsWith("util-button"))
            icon = "widget-button";
        else if (type.startsWith("util-spawn"))
            icon = "locate";
        else if (type.startsWith("util-"))
            icon = "wrench";
        return icon
    }

    const treeContents: TreeNodeInfo[] = map.elements.map((elem, index) => getNode(elem, index)) as TreeNodeInfo[];

    return (
        <div className="map-hierarchy">
            <Tree
                contents={treeContents}
                onNodeClick={(node) => {
                    setSelectedID(node.nodeData as GUID);
                }}
            />
        </div>
    );
}