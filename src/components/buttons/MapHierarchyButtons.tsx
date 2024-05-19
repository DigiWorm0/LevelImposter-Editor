import AddLayerButton from "./AddLayerButton";
import AddObjectButton from './AddObjectButton';
import DeleteObjectButton from './DeleteObjectButton';
import { ButtonGroup } from "@mui/material";

export default function MapHierarchyButtons() {
    return (
        <ButtonGroup
            fullWidth
            style={{ padding: 5 }}
        >
            <AddObjectButton buttonProps={{ color: "success" }} />
            <AddLayerButton buttonProps={{ color: "primary" }} />
            <DeleteObjectButton buttonProps={{ color: "error" }} />
        </ButtonGroup>
    );
}