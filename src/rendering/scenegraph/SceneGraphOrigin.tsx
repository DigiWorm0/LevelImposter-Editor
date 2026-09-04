import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {SceneGraphListItem} from "./SceneGraphListItem";
import {Public} from "@mui/icons-material";
import {docNameAtom} from "@editor/document/documentStore";
import useDraggingElementID from "../../hooks/elements/dragging/useDraggingElementID";
import React from "react";
import handleSceneGraphDrop from "./handleSceneGraphDrop";
import {useAtomValue} from "jotai";
import selectElementID from "../../editor/selection/selectElementID";
import {panToElement} from "@editor/viewport/panToElement";

export default function SceneGraphOrigin() {
    const mapName = useAtomValue(docNameAtom);

    const [, setDraggingID] = useDraggingElementID();
    const [isDragOver, setDragOver] = React.useState(false);

    return (
        <SceneGraphListItem
            disablePadding
            intent={"secondary"}

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
                handleSceneGraphDrop(undefined);

                setDragOver(false);
                setDraggingID(undefined);
                e.stopPropagation();
            }}
        >
            <ListItemButton
                onClick={() => selectElementID(undefined)}
                onDoubleClick={() => panToElement(undefined)}
                dense
                selected={isDragOver}
            >
                <ListItemIcon sx={{minWidth: 40}}>
                    <Public/>
                </ListItemIcon>
                <ListItemText primary={mapName}/>
            </ListItemButton>
        </SceneGraphListItem>
    );
}