import AddLayerButton from "./AddLayerButton";
import AddObjectButton from "./AddObjectButton";
import DeleteObjectButton from "./DeleteObjectButton";
import {Box} from "@mui/material";

export default function SceneGraphButtons() {
    return (
        <Box
            sx={{
                margin: 1,
                paddingBottom: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
            }}
        >
            <AddObjectButton buttonProps={{color: "success"}}/>
            <AddLayerButton buttonProps={{color: "primary"}}/>
            <DeleteObjectButton buttonProps={{color: "error"}}/>
        </Box>
    );
}