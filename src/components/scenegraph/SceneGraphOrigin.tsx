import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {SceneGraphListItem} from "./SceneGraphListItem";
import {useSetSelectedElemID} from "../../hooks/elements/useSelectedElem";
import {Public} from "@mui/icons-material";
import {useMapName} from "../../hooks/map/useMap";
import useDraggingElementID from "../../hooks/elements/useDraggingElementID";
import useElement from "../../hooks/elements/useElements";
import React from "react";
import useJumpToElement from "../../hooks/canvas/useJumpToElement";

export default function SceneGraphOrigin() {
    const setSelectedElemID = useSetSelectedElemID();
    const [mapName] = useMapName();
    const jumpToElement = useJumpToElement();

    const [draggingID, setDraggingID] = useDraggingElementID();
    const [draggingElement, setDraggingElement] = useElement(draggingID);
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
                if (draggingElement !== undefined)
                    setDraggingElement({...draggingElement, parentID: undefined});

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
    )
}