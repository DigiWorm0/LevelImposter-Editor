import React from "react";
import { Button, Collapse, Expander, IconName, InputGroup, Intent } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import useElement, { useDraggingElementID, useElementChildren, useIsDroppable } from "../../hooks/jotai/useElements";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import { useSelectedElemID } from "../../hooks/jotai/useSelectedElem";
import GUID, { MaybeGUID } from "../../types/generic/GUID";

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
    "util-layer": "folder-close"
}

export default function MapHierarchyElement(props: { elementID: MaybeGUID }) {
    const [isEditingName, setIsEditingName] = React.useState(false);
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
        if (!isDroppable)
            return "none";
        else if (type === "util-layer")
            return "primary";
        else if (type.startsWith("util-"))
            return "success";

        return "success";
    }

    if (element === undefined)
        return null;

    const isVisible = element.properties.isVisible === undefined ? true : element.properties.isVisible;
    const isExpanded = element.properties.isExpanded === undefined ? true : element.properties.isExpanded;
    const intent = getIntent(element.type);

    return (
        <div
            id={props.elementID}
            draggable
            style={{ marginLeft: 15 }}
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
                icon={getIcon(element.type)}
                text={isEditingName ?
                    <InputGroup
                        intent={intent}
                        small
                        autoFocus
                        value={element.name}
                        maxLength={20}
                        onChange={(e) => {
                            setElement({ ...element, name: e.target.value });
                        }}
                        onFocus={(e) => {
                            e.target.select();
                        }}
                        onBlur={() => setIsEditingName(false)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setIsEditingName(false);
                            }
                        }}
                    />
                    :
                    element.name
                }
                active={element.id === selectedID || isDragOver}
                disabled={!isDroppable}
                intent={intent}
                onClick={() => setSelectedID(element.id)}
                onDoubleClick={() => {
                    setIsEditingName(true);
                }}
                labelElement={
                    element.type === "util-layer" ? (
                        <Button
                            icon={isExpanded ? "caret-down" : "caret-right"}
                            disabled={!isDroppable}
                            minimal
                            intent={intent}
                            small
                            onClick={(e) => {
                                e.stopPropagation();
                                setElement({ ...element, properties: { ...element.properties, isExpanded: !isExpanded } });
                            }}
                            onDoubleClick={(e) => {
                                e.stopPropagation();
                            }}
                        />
                    ) : (
                        <Button
                            icon={isVisible ? "eye-open" : "eye-off"}
                            disabled={!isDroppable}
                            minimal
                            intent={intent}
                            small
                            onClick={(e) => {
                                e.stopPropagation();
                                saveHistory();
                                setElement({ ...element, properties: { ...element.properties, isVisible: !isVisible } });
                            }}
                            onDoubleClick={(e) => {
                                e.stopPropagation();
                            }}
                        />
                    )
                }

            />
            <Collapse isOpen={isExpanded} keepChildrenMounted>
                {childIDs.map((childID) => (
                    <MapHierarchyElement elementID={childID} key={childID} />
                ))}
            </Collapse>

        </div>
    );
}