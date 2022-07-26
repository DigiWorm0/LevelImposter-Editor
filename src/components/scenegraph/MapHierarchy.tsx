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
        if (elem.type === "util-blank")
            icon = "media";
        else if (elem.type.startsWith("task-"))
            icon = "build";
        else if (elem.type === "util-minimap")
            icon = "map";
        else if (elem.type === "util-cam")
            icon = "camera";
        else if (elem.type === "util-dummy")
            icon = "person";
        else if (elem.type.startsWith("util-button"))
            icon = "widget-button";
        else if (elem.type.startsWith("util-spawn"))
            icon = "locate";
        else if (elem.type.startsWith("util-"))
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