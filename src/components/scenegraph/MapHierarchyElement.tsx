import { Button, IconName, Intent } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import useElement from "../../hooks/jotai/useElement";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import { useSelectedLayerIDValue } from "../../hooks/jotai/useLayer";
import { useSelectedElemID } from "../../hooks/jotai/useSelectedElem";
import GUID from "../../types/generic/GUID";

const ICON_DB: Record<string, IconName> = {
    "util-blank": "media",
    "util-minimap": "map",
    "util-cam": "camera",
    "util-dummy": "person",
    "util-vitals": "pulse",
    "util-room": "map-marker",
    "util-computer": "desktop",
    "util-admin": "globe-network",
    "util-platform": "arrows-horizontal",
    "util-ladder1": "arrows-vertical",
    "util-ladder2": "arrows-vertical",
    "util-starfield": "star",
    "util-button1": "target",
    "util-button2": "target",
    "util-spawn1": "locate",
    "util-spawn2": "locate",
    "util-cams1": "video",
    "util-cams2": "video",
    "util-cams3": "video",
}

export default function MapHierarchyElement(props: { elementID: GUID }) {
    const [element, setElement] = useElement(props.elementID);
    const selectedLayerID = useSelectedLayerIDValue();
    const [selectedID, setSelectedID] = useSelectedElemID();
    const saveHistory = useSaveHistory();

    const getIcon = (type: string): IconName => {
        let icon = ICON_DB[type];
        if (icon)
            return icon;
        if (type.startsWith("task-"))
            return "build";
        else if (type.startsWith("sab-"))
            return "warning-sign";
        else if (type.startsWith("util-"))
            return "wrench";
        else if (type.startsWith("dec-") || type.startsWith("room-"))
            return "cube";
        return "help";
    }

    const getIntent = (type: string): Intent => {
        if (type === "util-blank")
            return "none";
        else if (type === "util-room")
            return "success";
        else if (type.startsWith("task-"))
            return "primary";
        else if (type.startsWith("sab-"))
            return "danger";
        else if (type.startsWith("util-"))
            return "warning";
        return "none";
    }

    if (element === undefined || (selectedLayerID !== undefined && element.properties.layer !== selectedLayerID))
        return null;

    const isVisible = element.properties.isVisible === undefined ? true : element.properties.isVisible;
    const intent = getIntent(element.type);
    const icon = getIcon(element.type);

    return (
        <MenuItem2
            style={{ outline: 0 }}
            id={element.id}
            icon={icon}
            text={element.name}
            active={element.id === selectedID}
            intent={intent}
            onClick={() => setSelectedID(element.id)}
            labelElement={
                <Button
                    icon={isVisible ? "eye-open" : "eye-off"}
                    minimal={true}
                    intent={intent}
                    small
                    onClick={() => {
                        saveHistory();
                        setElement({ ...element, properties: { ...element.properties, isVisible: !isVisible } });
                    }}
                />
            } />
    );
}