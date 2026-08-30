import {Collapse, IconButton, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";
import useDraggingElementID from "../../hooks/elements/dragging/useDraggingElementID";
import {MaybeGUID} from "@/shared/types/GUID";
import SceneGraphElementIcon from "./SceneGraphElementIcon";
import useIsElementSelected from "../../hooks/elements/useIsElementSelected";
import AnimatedCaretIcon from "../utils/AnimatedCaretIcon";
import {SceneGraphListItem} from "./SceneGraphListItem";
import handleSceneGraphDrop from "../../utils/element/handleSceneGraphDrop";
import selectElementID from "../../editor/selection/selectElementID";
import {useElement} from "@/hooks/elements/useElement";
import {panToElement} from "@/editor/viewport/panToElement";

export interface SceneGraphElementProps {
    elementID: MaybeGUID;
    searchQuery: string;
    depth: number;
}

export default function SceneGraphElement(props: SceneGraphElementProps) {
    const [, setDraggingID] = useDraggingElementID();
    const [_isExpanded, setIsExpanded] = React.useState(true);
    const isSelected = useIsElementSelected(props.elementID);
    const element = useElement(props.elementID);
    const [isDragOver, setDragOver] = React.useState(false);

    if (element === undefined)
        return null;

    const isGroup = element.type === "util-layer";
    const isExpanded = _isExpanded || props.searchQuery !== "";
    const isMatchName = element.name.toLowerCase().includes(props.searchQuery);
    const isMatchType = element.type.toLowerCase().includes(props.searchQuery);
    const isMatchID = element.id.startsWith(props.searchQuery);
    const isMatch = isMatchName || isMatchType || isMatchID;

    if (!isMatch && element.childrenIDs.length === 0)
        return null;

    return (
        <>
            <SceneGraphListItem
                id={props.elementID}
                intent={isGroup ? "primary" : "success"}
                draggable
                disablePadding
                onDragStart={(e) => {
                    setDraggingID(element.id);
                    e.stopPropagation();

                    // Set Drag Image
                    e.dataTransfer.setDragImage(new Image(), 0, 0);
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
                    handleSceneGraphDrop(props.elementID);

                    setDragOver(false);
                    setDraggingID(undefined);
                    e.stopPropagation();
                }}
                secondaryAction={isGroup && (
                    <IconButton
                        size={"small"}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <AnimatedCaretIcon up={!isExpanded}/>
                    </IconButton>
                )}
            >
                <ListItemButton
                    sx={{
                        paddingLeft: props.depth * 2 + 2,
                        paddingTop: 0.5,
                        paddingBottom: 0.5,
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: props.searchQuery ? "primary" : "transparent",
                        borderRadius: 2
                    }}
                    onClick={(e: MouseEvent) => {
                        const metaKey = e.metaKey || e.ctrlKey;
                        const shiftKey = e.shiftKey;
                        const operation = metaKey ? "toggle" : shiftKey ? "add" : "set";

                        selectElementID(
                            element.id,
                            operation
                        );
                    }}
                    onDoubleClick={() => panToElement(element.id)}
                    dense
                    selected={isSelected || isDragOver}
                >
                    <ListItemIcon sx={{minWidth: 40}}>
                        <SceneGraphElementIcon type={element.type}/>
                    </ListItemIcon>
                    <ListItemText
                        primary={element.name}
                        sx={{
                            marginTop: 0,
                            marginBottom: 0,
                        }}
                    />
                </ListItemButton>
            </SceneGraphListItem>
            <Collapse in={isExpanded}>
                {element.childrenIDs.map((childID) => (
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