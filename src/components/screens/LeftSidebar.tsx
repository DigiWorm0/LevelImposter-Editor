import MapHierarchy from "../scenegraph/MapHierarchy";
import SceneScroller from "../scenegraph/SceneScroller";
import { Paper } from "@mui/material";

export default function LeftSidebar() {

    return (
        <Paper className="left-sidebar">
            <MapHierarchy />
            <SceneScroller />
        </Paper>
    );
}