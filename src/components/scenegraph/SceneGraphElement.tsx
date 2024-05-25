import { ExpandLess } from "@mui/icons-material";
import { Collapse, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import useDraggingElementID from "../../hooks/elements/useDraggingElementID";
import { useElementChildIDs } from "../../hooks/elements/useElementChildIDs";
import useElement from "../../hooks/elements/useElements";
import useIsDroppable from "../../hooks/elements/useIsDroppable";
import { useSettingsValue } from "../../hooks/useSettings";
import { MaybeGUID } from "../../types/generic/GUID";
import { IconName } from "../utils/MaterialIcon";
import SceneGraphElementIcon from "./SceneGraphElementIcon";
import useIsElementSelected from "../../hooks/elements/useIsElementSelected";
import { useSetSelectedElemID } from "../../hooks/elements/useSelectedElem";

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

export interface SceneGraphElementProps {
    elementID: MaybeGUID;
    searchQuery: string;
    depth: number;
}

export default function SceneGraphElement(props: SceneGraphElementProps) {
    const [draggingID, setDraggingID] = useDraggingElementID();
    const [draggingElement, setDraggingElement] = useElement(draggingID);
    const isSelected = useIsElementSelected(props.elementID);
    const setSelectedElemID = useSetSelectedElemID();
    const [element, setElement] = useElement(props.elementID);
    const isDroppable = useIsDroppable(props.elementID);
    const childIDs = useElementChildIDs(props.elementID);
    const { elementNesting } = useSettingsValue();
    const [isDragOver, setDragOver] = React.useState(false);

    if (element === undefined)
        return null;

    const isGroup = element.type === "util-layer";
    const isDisabled = !((isGroup || elementNesting) && isDroppable) && draggingID !== undefined;
    const isExpanded = (element.properties.isExpanded ?? true) || props.searchQuery !== "";
    const isMatchName = element.name.toLowerCase().includes(props.searchQuery.toLowerCase());
    const isMatchType = element.type.toLowerCase().includes(props.searchQuery.toLowerCase());
    const isMatchID = element.id.startsWith(props.searchQuery);
    const isMatch = isMatchName || isMatchType || isMatchID;

    if (!isMatch && childIDs.length === 0)
        return null;

    return (
        <>
            <ListItem
                id={props.elementID}
                draggable
                disablePadding
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
                secondaryAction={isGroup && (
                    <IconButton
                        size={"small"}
                        onClick={() => setElement({
                            ...element,
                            properties: { ...element.properties, isExpanded: !isExpanded }
                        })}
                    >
                        <ExpandLess
                            style={{
                                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s"
                            }}
                        />
                    </IconButton>
                )}
            >
                <ListItemButton
                    sx={{ pe: props.depth + 1 }}
                    onClick={() => setSelectedElemID(element.id)}
                    disabled={isDisabled}
                    dense
                    selected={isSelected || isDragOver}
                >
                    <ListItemIcon>
                        <SceneGraphElementIcon type={element.type} />
                    </ListItemIcon>
                    <ListItemText primary={element.name} />
                </ListItemButton>
            </ListItem>
            <Collapse in={isExpanded}>
                {childIDs.map((childID) => (
                    <SceneGraphElement
                        elementID={childID}
                        key={childID}
                        searchQuery={props.searchQuery}
                        depth={props.depth + 1}
                    />
                ))}
            </Collapse>
        </>
    );
}