import { IconName, Tree, TreeNodeInfo } from "@blueprintjs/core";
import { useMapValue } from "../../hooks/jotai/useMap";
import { useSelectedElemID } from "../../hooks/jotai/useSelectedElem";
import GUID from "../../types/generic/GUID";

export default function MapHierarchy() {
    const map = useMapValue();
    const [selectedID, setSelectedID] = useSelectedElemID();

    const treeContents: TreeNodeInfo[] = [];
    map.elements.forEach((elem, index) => {
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