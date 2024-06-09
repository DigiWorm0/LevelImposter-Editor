import { Collapse, IconButton, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import useDraggingElementID from "../../hooks/elements/useDraggingElementID";
import { useElementChildIDs } from "../../hooks/elements/useElementChildIDs";
import useElement from "../../hooks/elements/useElements";
import useIsDroppable from "../../hooks/elements/useIsDroppable";
import { useSettingsValue } from "../../hooks/useSettings";
import { MaybeGUID } from "../../types/generic/GUID";
import SceneGraphElementIcon from "./SceneGraphElementIcon";
import useIsElementSelected from "../../hooks/elements/useIsElementSelected";
import { useSetSelectedElemID } from "../../hooks/elements/useSelectedElem";
import AnimatedCaretIcon from "../utils/AnimatedCaretIcon";
import { SceneGraphListItem } from "./SceneGraphListItem";
import useJumpToElement from "../../hooks/canvas/useJumpToElement";

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
    const jumpToElement = useJumpToElement();

    if (element === undefined)
        return null;

    const isGroup = element.type === "util-layer";
    const isDisabled = !((isGroup || elementNesting) && isDroppable) && draggingID !== undefined;
    const isExpanded = (element.properties.isExpanded ?? true) || props.searchQuery !== "";
    const isMatchName = element.name.toLowerCase().includes(props.searchQuery);
    const isMatchType = element.type.toLowerCase().includes(props.searchQuery);
    const isMatchID = element.id.startsWith(props.searchQuery);
    const isMatch = isMatchName || isMatchType || isMatchID;

    if (!isMatch && childIDs.length === 0)
        return null;

    return (
        <>
            <SceneGraphListItem
                id={props.elementID}
                isGroup={isGroup}
                draggable
                disablePadding
                onDragStart={(e) => {
                    if (e.dataTransfer.getData("text/plain") !== "")
                        return;

                    setDraggingID(element.id);
                    e.dataTransfer.setData("text/plain", element.id);
                }}
                onDragEnd={() => {
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
                        <AnimatedCaretIcon up={!isExpanded} />
                    </IconButton>
                )}
            >
                <ListItemButton
                    sx={{
                        paddingLeft: props.depth * 2 + 2,
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: props.searchQuery ? "primary" : "transparent",
                        borderRadius: 2
                    }}
                    onClick={() => setSelectedElemID(element.id)}
                    onDoubleClick={() => jumpToElement(element.id)}
                    disabled={isDisabled}
                    dense
                    selected={isSelected || isDragOver}
                >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <SceneGraphElementIcon type={element.type} />
                    </ListItemIcon>
                    <ListItemText
                        primary={element.name}
                    />
                </ListItemButton>
            </SceneGraphListItem>
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