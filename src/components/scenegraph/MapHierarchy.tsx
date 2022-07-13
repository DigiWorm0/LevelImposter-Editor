import { IconName, Tree, TreeNodeInfo } from "@blueprintjs/core";
import { useElements } from "../../hooks/useElement";
import useMap from "../../hooks/useMap";
import useSelected from "../../hooks/useSelected";
import GUID from "../../types/generic/GUID";

export default function MapHierarchy() {
    const [map] = useMap();
    const [elems] = useElements(map.elementIDs);
    const [selectedID, setSelectedID] = useSelected();

    const treeContents: TreeNodeInfo[] = [];
    elems.forEach((elem, index) => {
        let icon: IconName = "cube";
        if (elem.type.startsWith("task-"))
            icon = "build";
        if (elem.type.startsWith("util-") && elem.type !== "util-blank")
            icon = "wrench";

        treeContents.push({
            id: elem.id + "-" + index,
            label: elem.name,
            icon: icon,
            isSelected: elem.id === selectedID,
            nodeData: elem.id

        });
    });

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