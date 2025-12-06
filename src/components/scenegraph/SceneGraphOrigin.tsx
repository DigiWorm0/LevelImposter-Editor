import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {SceneGraphListItem} from "./SceneGraphListItem";
import {useSetSelectedElemID} from "../../hooks/elements/useSelectedElem";
import {Public} from "@mui/icons-material";
import {useMapName} from "../../hooks/map/useMap";
import useDraggingElementID from "../../hooks/elements/dragging/useDraggingElementID";
import React from "react";
import useJumpToElement from "../../hooks/canvas/useJumpToElement";
import handleSceneGraphDrop from "../../utils/element/handleSceneGraphDrop";

export default function SceneGraphOrigin() {
    const setSelectedElemID = useSetSelectedElemID();
    const [mapName] = useMapName();
    const jumpToElement = useJumpToElement();

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
                onClick={() => setSelectedElemID(undefined)}
                onDoubleClick={() => jumpToElement(undefined)}
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