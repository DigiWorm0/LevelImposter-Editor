import { Button, IconName, MenuItem } from "@blueprintjs/core";
import useElement from "../../hooks/jotai/useElement";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import { useSelectedElemID } from "../../hooks/jotai/useSelectedElem";
import GUID from "../../types/generic/GUID";

export default function MapHierarchyElement(props: { elementID: GUID }) {
    const [element, setElement] = useElement(props.elementID);
    const [selectedID, setSelectedID] = useSelectedElemID();
    const saveHistory = useSaveHistory();

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

    if (element === undefined)
        return null;

    const isVisible = element.properties.isVisible === undefined ? true : element.properties.isVisible;

    return (
        <MenuItem
            icon={getIcon(element.type)}
            text={element.name}
            selected={element.id === selectedID}
            onClick={() => setSelectedID(element.id)}
            labelElement={
                <Button
                    icon={isVisible ? "eye-open" : "eye-off"}
                    minimal={true}
                    small
                    onClick={() => {
                        saveHistory();
                        setElement({ ...element, properties: { ...element.properties, isVisible: !isVisible } });
                    }}
                />
            }
        />
    );
}