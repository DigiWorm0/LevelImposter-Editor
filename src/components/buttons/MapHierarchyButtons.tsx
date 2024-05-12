import { ButtonGroup } from "@blueprintjs/core";
import AddLayerButton from "./AddLayerButton";
import AddObjectButton from './AddObjectButton';
import DeleteObjectButton from './DeleteObjectButton';

export default function MapHierarchyButtons() {
    return (
        <ButtonGroup
            fill
            style={{ padding: 5 }}
            minimal
        >
            <AddObjectButton buttonProps={{ intent: "success" }} />
            <AddLayerButton buttonProps={{ intent: "primary" }} />
            <DeleteObjectButton buttonProps={{ intent: "danger" }} />
        </ButtonGroup>
    );
}