import SceneGraphElement from "./SceneGraphElement";
import React from "react";
import { useElementChildIDs } from "../../hooks/elements/useElementChildIDs";
import { List } from "@mui/material";

export interface SceneGraphElementsProps {
    searchQuery: string;
}

export default function SceneGraphElements(props: SceneGraphElementsProps) {
    const elementIDs = useElementChildIDs(undefined);
    return (
        <List sx={{ flexGrow: 1, overflowY: "auto" }}>
            {elementIDs.map((elemID) => (
                <SceneGraphElement
                    key={elemID}
                    elementID={elemID}
                    searchQuery={props.searchQuery}
                    depth={0}
                />
            ))}
        </List>
    );
}