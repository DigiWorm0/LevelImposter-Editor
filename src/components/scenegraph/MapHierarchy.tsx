import { Button, H2, InputGroup, Tree, TreeNode, TreeNodeInfo } from "@blueprintjs/core";
import React from "react";
import useMap from "../../hooks/useMap";

export default function MapHierarchy() {
    const [map, setMap] = useMap();

    const treeContents: TreeNodeInfo[] = [];
    map.elementIDs.forEach((elemID, index) => {
        treeContents.push({
            id: index,
            label: `Element ${index}`
        });
    });

    return (
        <div className="map-hierarchy">
            <Tree contents={treeContents} />
        </div>
    )
}