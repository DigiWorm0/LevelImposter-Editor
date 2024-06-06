import SceneGraph from "../scenegraph/SceneGraph";
import { Paper } from "@mui/material";

export default function LeftSidebar() {
    return (
        <Paper
            elevation={1}
            sx={{
                width: 270,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                paddingTop: 1,
                top: 0,
                bottom: 0,
                left: 0,
            }}
        >
            <SceneGraph />
        </Paper>
    );
}