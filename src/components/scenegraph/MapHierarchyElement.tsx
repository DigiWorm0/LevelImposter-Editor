import { Collapse } from "@blueprintjs/core";
import { Button } from "@mui/material";
import React from "react";
import useElement, {
    useDraggingElementID,
    useElementChildren,
    useIsDroppable
} from "../../hooks/map/elements/useElements";
import { useSelectedElemID } from "../../hooks/map/elements/useSelectedElem";
import { useSettingsValue } from "../../hooks/useSettings";
import { MaybeGUID } from "../../types/generic/GUID";
import MaterialIcon, { IconName } from "../utils/MaterialIcon";

const ICON_DB: Record<string, IconName> = {
    "util-blank": "Interests",
    "util-minimap": "Map",
    "util-cam": "Camera",
    "util-dummy": "Person",
    "util-vitals": "MonitorHeart",
    "util-room": "Room",
    "util-computer": "Computer",
    "util-admin": "Language",
    "util-platform": "SwapHoriz",
    "util-ladder1": "SwapVert",
    "util-ladder2": "SwapVert",
    "util-starfield": "Star",
    "util-button1": "CrisisAlert",
    "util-button2": "CrisisAlert",
    "util-spawn1": "Flag",
    "util-spawn2": "Flag",
    "util-cams1": "PlayArrow",
    "util-cams2": "PlayArrow",
    "util-cams3": "PlayArrow",
    "util-layer": "Folder"
}

export default function MapHierarchyElement(props: { elementID: MaybeGUID, searchQuery: string, isRoot: boolean }) {
    const [draggingID, setDraggingID] = useDraggingElementID();
    const [selectedID, setSelectedID] = useSelectedElemID();
    const [element, setElement] = useElement(props.elementID);
    const [draggingElement, setDraggingElement] = useElement(draggingID);
    const isDroppable = useIsDroppable(props.elementID);
    const childIDs = useElementChildren(props.elementID);
    const { elementNesting } = useSettingsValue();
    const [isDragOver, setDragOver] = React.useState(false);

    const getIcon = (type: string): IconName => {
        let icon = ICON_DB[type];
        if (icon)
            return icon;
        if (type.startsWith("task-"))
            return "Handyman";
        else if (type.startsWith("sab-"))
            return "Warning";
        else if (type.startsWith("util-"))
            return "Build";
        else if (type.startsWith("dec-") || type.startsWith("room-"))
            return "Chair";
        return "Help";
    }

    if (element === undefined)
        return null;

    const isDisabled = !((element.type === "util-layer" || elementNesting) && isDroppable) && draggingID !== undefined;
    const isVisible = element.properties.isVisible ?? true;
    const isExpanded = (element.properties.isExpanded ?? true) || props.searchQuery !== "";
    const isMatchName = element.name.toLowerCase().includes(props.searchQuery.toLowerCase());
    const isMatchType = element.type.toLowerCase().includes(props.searchQuery.toLowerCase());
    const isMatchID = element.id.startsWith(props.searchQuery);
    const isMatch = isMatchName || isMatchType || isMatchID;

    if (!isMatch && childIDs.length === 0)
        return null;

    return (
        <div
            id={props.elementID}
            draggable
            style={{
                marginLeft: props.isRoot ? 5 : 15,
            }}
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
                if (!(data === element.id || draggingElement === undefined || isDisabled)) {
                    setDraggingElement({ ...draggingElement, parentID: element.id });
                }
                setDragOver(false);
                setDraggingID(undefined);
                e.stopPropagation();
            }}
        >
            {/*<MenuItem2
                style={{
                    //outline: "none",
                    outline: isMatch && props.searchQuery !== "" ? "rgba(45, 114, 210, 0.6) solid 2px" : "none",
                    outlineOffset: -1,
                    marginTop: 1,
                }}
                id={element.id}
                icon={getIcon(element.type)}
                text={element.name}
                active={element.id === selectedID || isDragOver}
                disabled={isDisabled}
                intent={intent}
                onClick={() => setSelectedID(element.id)}
                labelElement={
                    element.type === "util-layer" ? (
                        <Button
                            icon={isExpanded ? "caret-down" : "caret-right"}
                            disabled={isDisabled}
                            minimal
                            intent={intent}
                            small
                            onClick={(e) => {
                                e.stopPropagation();
                                setElement({
                                    ...element,
                                    properties: { ...element.properties, isExpanded: !isExpanded }
                                });
                            }}
                            onDoubleClick={(e) => {
                                e.stopPropagation();
                            }}
                        />
                    ) : (
                        <Button
                            icon={isVisible ? "eye-open" : "eye-off"}
                            disabled={isDisabled}
                            minimal
                            intent={intent}
                            small
                            onClick={(e) => {
                                e.stopPropagation();
                                setElement({
                                    ...element,
                                    properties: { ...element.properties, isVisible: !isVisible }
                                });
                            }}
                            onDoubleClick={(e) => {
                                e.stopPropagation();
                            }}
                        />
                    )
                }

            />
            */}
            <Button
                fullWidth
                style={{
                    outline: isMatch && props.searchQuery !== "" ? "rgba(45, 114, 210, 0.6) solid 2px" : "none",
                    outlineOffset: -1,
                    marginTop: 1,
                }}
                id={element.id}
                startIcon={<MaterialIcon icon={getIcon(element.type)} />}
                onClick={() => setSelectedID(element.id)}
                disabled={isDisabled}
                color={element.type === "util-layer" ? "primary" : "inherit"}
                size={"small"}
            >
                {element.name}
            </Button>
            <Collapse
                isOpen={isExpanded}
                keepChildrenMounted>

                {childIDs.map((childID) => (
                    <MapHierarchyElement
                        elementID={childID}
                        key={childID}
                        searchQuery={props.searchQuery}
                        isRoot={false}
                    />
                ))}
            </Collapse>
        </div>
    );
}