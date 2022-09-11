import React from "react";
import { Button, IconName, Intent } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import useElement, { useDraggingElementID, useElementChildren, useIsDroppable } from "../../hooks/jotai/useElements";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
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
    const [draggingID, setDraggingID] = useDraggingElementID();
    const [selectedID, setSelectedID] = useSelectedElemID();
    const [element, setElement] = useElement(props.elementID);
    const [draggingElement, setDraggingElement] = useElement(draggingID);
    const isDroppable = useIsDroppable(props.elementID);
    const childIDs = useElementChildren(props.elementID);
    const saveHistory = useSaveHistory();
    const [isDragOver, setDragOver] = React.useState(false);

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

    if (element === undefined)
        return null;

    const isVisible = element.properties.isVisible === undefined ? true : element.properties.isVisible;
    const intent = getIntent(element.type);
    const icon = getIcon(element.type);

    return (
        <div
            id={props.elementID}
            draggable
            onDragStart={(e) => {
                if (e.dataTransfer.getData("text/plain") !== "")
                    return;

                setDraggingID(element.id);
                e.dataTransfer.setData("text/plain", element.id);
            }}
            onDragEnd={(e) => {
                setDragOver(false);
                setDraggingID(undefined);
            }}
            onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
                e.stopPropagation();
            }}
            onDragLeave={(e) => {
                e.preventDefault();
                setDragOver(false);
                e.stopPropagation();
            }}
            onDrop={(e) => {
                e.preventDefault();
                const data = e.dataTransfer.getData("text/plain");
                if (!(data === element.id || draggingElement === undefined || !isDroppable)) {
                    saveHistory();
                    setDraggingElement({ ...draggingElement, parentID: element.id });
                }
                setDragOver(false);
                setDraggingID(undefined);
                e.stopPropagation();
            }}
        >
            <MenuItem2
                style={{ outline: 0 }}
                id={element.id}
                icon={icon}
                text={element.name}
                active={element.id === selectedID || isDragOver}
                disabled={!isDroppable}
                intent={intent}
                onClick={() => setSelectedID(element.id)}
                labelElement={
                    <Button
                        icon={isVisible ? "eye-open" : "eye-off"}
                        disabled={!isDroppable}
                        minimal={true}
                        intent={intent}
                        small
                        onClick={() => {
                            saveHistory();
                            setElement({ ...element, properties: { ...element.properties, isVisible: !isVisible } });
                        }}
                    />
                }

            />

            {childIDs.map((childID) => (
                <div key={childID} style={{ marginLeft: 15 }}>
                    <MapHierarchyElement elementID={childID} />
                </div>
            ))}

        </div>
    );
}