import { ButtonGroup } from "@blueprintjs/core";
import AddLayerButton from "./AddLayerButton";
import AddObjectButton from './AddObjectButton';
import DeleteObjectButton from './DeleteObjectButton';

export default function MapButtons() {
    return (
        <ButtonGroup
            fill
            style={{ padding: 5 }}
            minimal>

            <AddObjectButton
                isSidePanel={true} />

            <AddLayerButton
                isSidePanel={true} />

            <DeleteObjectButton
                isSidePanel={true} />

        </ButtonGroup>
    );
}